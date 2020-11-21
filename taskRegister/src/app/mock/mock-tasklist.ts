import { Task } from '../models/task';

export const TaskList: Task[] = [
    {task_id:1, org_id:1, title:"Tool development for Analysis Server", startDate:"01/01/19", endDate:"01/02/19", product:"NTAS",
    description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    evaluation:7, comments:"Lorem ipsum dolor sit amet, consectetur adipisicing elit"},
    {task_id:2, org_id:1, title:"mock_task_2", startDate:"01/02/19", endDate:"23/03/19", product:"NTAS",
    description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    evaluation:10, comments:"Lorem ipsum dolor sit amet, consectetur adipisicing elit"},
    {task_id:3, org_id:1, title:"mock_task_3", startDate:"24/03/19", endDate:"30/5/19", product:"NTAS",
    description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    evaluation:2, comments:"Lorem ipsum dolor sit amet, consectetur adipisicing elit"}
]