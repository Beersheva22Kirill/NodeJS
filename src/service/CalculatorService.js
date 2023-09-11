import CalculatorView from "../view/CalculatorView.js";

const view = new CalculatorView();
export const UNKNOW_OPERATION = "Unknow operation";

export default class CalculatorService {

    constructor(emmiter, operations){
        for (const operation of operations.keys()) {
            emmiter.on(operation,(operands,response) => {
                const operationFromMap = operations.get(operation);
                this.writeResult(response,operationFromMap(operands[0],operands[1]))
            })
        }

        emmiter.on(UNKNOW_OPERATION,(operands,response) => {
            this.writeResult(response,UNKNOW_OPERATION)
        })
    }

    writeResult(response, result) {
        response.write(view.getHtml(result, result==UNKNOW_OPERATION));
        response.end();
    }
}