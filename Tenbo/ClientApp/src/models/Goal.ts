export interface IGoal {
    id: string
    name: string,
    motivation: string,
    purpose: string,
    startDate:Date,
    objectives: Array<IObjective>
}

export interface IObjective {
    id: string
    name: string,
    beginDate:Date,
    etaFinishDate:Date,
    isCompleted:boolean,
    
}

export interface ITenboAction {
    id: string
    name: string,
    summary:string,
    date:Date
    isCompleted:boolean
}