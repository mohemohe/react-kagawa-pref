import React from "react";
import {style} from "typestyle";
import isFunction from "lodash.isfunction";
import Dialog, {DialogProps} from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

interface IState {
    checked: boolean;
    closed: boolean;
}

export interface IProps extends DialogProps {
    title?: string;
    text?: string;
    yesButtonText?: string;
    noButtonText?: string;
    yesButtonCallback?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    noButtonCallback?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    showDissmiss?: boolean;
    dismissText?: string;
    dismissLocalStorageKey?: string;
}

const classNames = {
    actions: style({
        display: "flex",
        justifyContent: "space-between",
    }),
};

export default class Embed extends React.Component<IProps, IState> {
    constructor(props: IProps, state: IState) {
        super(props, state);

        this.state = {
            checked: false,
            closed: false,
        };
    }

    private get key() {
        return this.props.dismissLocalStorageKey || "react-kagawa-pref";
    }

    private saveDissmiss(state: boolean) {
        localStorage[this.key] = state;
    }

    public render() {
        const nextProps = Object.assign({}, this.props) as any;
        delete nextProps.title;
        delete nextProps.text;
        delete nextProps.yesButtonText;
        delete nextProps.noButtonText;
        delete nextProps.yesButtonCallback;
        delete nextProps.noButtonCallback;
        delete nextProps.showDissmiss;
        delete nextProps.dismissText;
        delete nextProps.dismissLocalStorageKey;
        if (this.state.closed || localStorage[this.key] != null) {
            // FIXME: きたねー
            nextProps.open = false;
        }

        const title = this.props.title || "香川県民チェック";
        const text = this.props.text || "香川県民はネット・ゲーム依存症防止のため、確認が必要です。\nあなたは香川県民ですか？";
        const yesButtonText = this.props.yesButtonText || "はい";
        const noButtonText = this.props.noButtonText || "いいえ";
        const dismissText = this.props.dismissText || "次回から表示しない";

        const buttons = (
            <>
                <Button
                    autoFocus
                    onClick={(event) => {
                        if (this.state.checked) {
                            this.saveDissmiss(false);
                        }
                        if (isFunction(this.props.noButtonCallback)) {
                            this.props.noButtonCallback(event);
                        } else {
                            this.setState({
                                closed: true,
                            });
                        }
                    }
                }>
                    {noButtonText}
                </Button>
                <Button
                    color={"secondary"} 
                    onClick={(event) => {
                        if (this.state.checked) {
                            this.saveDissmiss(true);
                        }
                        if (isFunction(this.props.yesButtonCallback)) {
                            this.props.yesButtonCallback(event);
                        } else {
                            this.setState({
                                closed: true,
                            });
                        }
                    }
                }>
                    {yesButtonText}
                </Button>
            </>
        );

        return (
            <Dialog {...nextProps}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {text.split("\n").map((line) => <p>{line}</p>)}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {this.props.showDissmiss ?
                        <div className={classNames.actions}>
                            <div>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.checked}
                                            onChange={(_, checked) => this.setState({checked})}
                                            color="primary"
                                        />
                                    }
                                    label={dismissText}
                                />
                            </div>
                            <div>
                                {buttons}
                            </div>
                        </div> :
                        buttons    
                    }
                </DialogActions>
            </Dialog>
        );
    }
}
