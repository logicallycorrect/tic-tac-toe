import React, { Component } from 'react'

export class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            num: [],
            userInputs: {
                1: '',
                2: '',
                3: '',
                4: '',
                5: '',
                6: '',
                7: '',
                8: '',
                9: ''
            },
            player: 1
        }
    }

    handleInput = (e, userInput) => {
        const { userInputs, num, player } = this.state;

        if (num.includes(e.target.value)) {
            alert("Number already present try another")
            return;
        }
        if (e.target.value > 9 && e.target.value <= 0) {
            alert("try another number")
            return;
        }
        if (!userInputs[userInput[0]]) {

            let newUserInput = { ...userInputs };
            newUserInput[userInput[0]] = e.target.value;
            this.setState({
                userInputs: { ...newUserInput },
                num: [...num, e.target.value],
            }, () => this.handleWin())
        }
    }

    handleWin = () => {
        let { userInputs, player } = this.state;
        let rowSum = 0, columnSum = 0, countColumn = 0, countRow = 0;


        // check digonally
        if (((+userInputs[1] + +userInputs[5] + +userInputs[9]) >= 15 && +userInputs[1] && +userInputs[5] && +userInputs[9]) |
            (+userInputs[3] + +userInputs[5] + +userInputs[7]) >= 15 && +userInputs[3] && +userInputs[5] && +userInputs[7]) {
            alert(`player ${player} won diagonally`);
        }


        for (let i = 0; i < 3; i++) {
            rowSum = 0;
            columnSum = 0;

            // Row Sum
            for (let j = (i * 3) + 1; j <= (i * 3) + 3; j++) {
                rowSum += userInputs[j] ? +userInputs[j] : 0;
                countRow += userInputs[j] ? 1 : 0;
            }
            // Column Sum
            for (let k = i + 1; k <= i + 6 + 1; k += 3) {
                columnSum += userInputs[k] ? +userInputs[k] : 0;
                countColumn += userInputs[k] ? 1 : 0;
            }
            if (rowSum >= 15 && countRow == 3) {
                alert(`player ${player} won row`);
            }

            if (columnSum >= 15 && countColumn == 3) {
                alert(`player ${player} won column`);
            }
        }

        this.setState((state) => {
            return {
                player: state.player == 1 ? 2 : 1
            }
        })
    }

    resetState = () => {
        this.setState({
            num: [],
            userInputs: {
                1: '',
                2: '',
                3: '',
                4: '',
                5: '',
                6: '',
                7: '',
                8: '',
                9: ''
            },
            player: 1
        })
    };



    render() {
        const { userInputs } = this.state;
        return (
            <div className="tic">
                {Object.entries(userInputs).map((userInput, index) => {

                    return (<input disabled={userInput[1]} key={`input-${index}`} onChange={(e) => this.handleInput(e, userInput)} value={userInput[1]} />)
                })}
            </div>
        )
    }
}

export default Main