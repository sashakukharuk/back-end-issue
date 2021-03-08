import {Assignee, IssueType, Priority, ResponseData, Status, TypeIssue} from "../Types/TypeIssue";
import {FilterGradationData} from "./FilterGradationData";
import {differentDate} from "../middleware/differentDate";
import {CreateArrayPositions} from "./CreateArrayPositions";

export class ParseIssue {
    readonly responseData: ResponseData | undefined
    private data: TypeIssue
    private positionY = {} as { [x: string]: any; }
    private positionX = {} as { [x: string]: any; }
    private priority = [] as Priority[]
    private status = [] as Status[]
    private issuetype = [] as IssueType[]
    private assignee = [] as Assignee[]

    constructor(data: TypeIssue) {
        this.data = data
    }

    public parse() {
        this.data.issues.forEach(issue => {
            this.priority.push(issue.fields.priority)
            this.status.push(issue.fields.status)
            this.issuetype.push(issue.fields.issuetype)
            this.assignee.push({name: issue.fields.assignee ? issue.fields.assignee.displayName : 'Assignee', issues: []})
        })

        this.status = FilterGradationData.filter<Status>(this.status)
        this.priority = FilterGradationData.filter<Priority>(this.priority)
        this.issuetype = FilterGradationData.filter<IssueType>(this.issuetype)
        this.assignee = FilterGradationData.filter<Assignee>(this.assignee)


        this.status = FilterGradationData.gradation<string, Status>(['To Do', 'In Progress', 'In Review', 'Done'], this.status)
        this.priority = FilterGradationData.gradation<string, Priority>(['Highest', 'High', 'Medium', 'Low', 'Lowest'], this.priority)
        this.issuetype = FilterGradationData.gradation<string, IssueType>(['Bug', 'Task', 'Improvement', 'New Feature'], this.issuetype)

        this.positionY = CreateArrayPositions.createPositionsPoint(this.issuetype)
        this.positionX = CreateArrayPositions.createPositionsPoint(this.priority)

        this.setArraySchemaIssues()
        this.filterIssues()

        return {
            status: this.status,
            assignee: this.assignee,
            priority: this.priority,
            issuetype: this.issuetype
        }
    }

    private setArraySchemaIssues() {
        this.assignee.forEach(item => {
            const createArray = new CreateArrayPositions()
            item.issues = createArray.createLevelsArray(this.issuetype, this.priority)
        })
    }

    private filterIssues() {
        this.data.issues.map(issue => {
            this.assignee.forEach(item => {
                const displayName = issue.fields.assignee ? issue.fields.assignee.displayName : 'Assignee'
                if (item.name === displayName) {
                    item.issues[this.positionY[issue.fields.issuetype.name]][this.positionX[issue.fields.priority.name]].push({
                        position: `${this.positionY[issue.fields.issuetype.name]},${this.positionX[issue.fields.priority.name]}`,
                        status: issue.fields.status.name,
                        link: `https://myfirtssite.atlassian.net/issues/?jql=assignee%20in%20(${issue.fields.assignee ? issue.fields.assignee.accountId : 'EMPTY'})%20AND%20issuetype%20%3D%20"${issue.fields.issuetype.name}"%20AND%20status%20%3D%20"${issue.fields.status.name}"%20AND%20priority%20%3D%20${issue.fields.priority.name}`,
                        differentCreated: differentDate(issue.fields.created),
                        differentDue: differentDate(issue.fields.duedate)
                    })
                }
            })
        })
    }
}
