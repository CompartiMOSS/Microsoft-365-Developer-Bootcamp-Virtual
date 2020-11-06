import React = require("react");
import { SessionScheduleProps, SessionScheduleTable } from "./Types/SessionSchedule";

export class ScheduleComponent extends React.Component<SessionScheduleTable> 
{

    constructor(props: SessionScheduleTable) {
        super(props);
    }


    getHtml()
    {
        let html : JSX.Element[] = [];
        let index : number = 0;
        this.props.ScheduleTable.forEach(function(item:SessionScheduleProps)
        {
            html.push(
            <div id={"item" + index} className="itemSchedule">
                    <div className="time">{item.Schedule}</div>
                    <div className="sessionData">
                        <div className="title">{item.Title}</div>
                        <div className="speaker">{item.Speaker}</div>
                    </div>
            </div>
            )
            index = index + 1; 
        });

        return html;
    }

    public render(): JSX.Element
    {
    return (
            <div id="scheduleContainer">
                {this.getHtml()}
            </div>
        );
    }
}

