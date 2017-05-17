import React from 'react';
import _ from 'underscore';
import Radio from '../../common/radioBtn'
import Select from '../../common/select'
import TextBox from '../../common/textbox';
import Calender from '../../common/datepicker';

const Question = (props) => {
    console.log("choices");


    if(props.data.ControlType == "Calendar") {

        return (<div>
           <span>
           <div style={{display: 'inline-block',marginRight: '20px'}}>{props.data.Caption}</div>
                <Calender data={props.data} events={props.events.opendatepicker}/>
           </span>
        </div>)
    }
    else{
        return (
            <div>

            <span>  {(props.data.FieldValues != undefined && props.data.FieldValues.length >0)||props.data.ControlType == 'Textbox' ?
                <div>{props.data.Caption}</div>:null}
                <form>
                        <div className="radio" style={{ marginTop: '0px' }}>
                            <div className="control-group" style={{ padding: '0px' }}>
                                {props.data.FieldValues != undefined && props.data.FieldValues.length <= 4 ?
                                    _.map(props.data.FieldValues, function (c, i) {
                                        return <Radio key={props.clientproductId + "-" + i} isValid={props.data.isValid} caption={props.data.Caption} data={c} categoryName={props.categoryName} clientProductId={props.clientproductId} selected={props.data.Value == c.Code ? true : false} qId={props.qId} events={props.events.eMenuOptionselect} />
                                    })
                                    : <Select data={props.data} categoryName={props.categoryName} caption={props.data.Caption}
                                              clientProductId={props.clientproductId} qId={props.qId} events={props.events.eMenuOptionselect} />
                                }
                                {props.data.ControlType == 'Textbox' &&
                                    <TextBox data={props.data} categoryName={props.categoryName} caption={props.data.Caption}
                                             clientProductId={props.clientproductId} qId={props.qId} events={props.events.eMenuOptionselect}/>
                                }
                            </div>
                        </div>
                    </form>
                </span>
            </div>
        )}
}

export default Question;
