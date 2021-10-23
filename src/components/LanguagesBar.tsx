import React, {useContext} from 'react';
import {FormattedMessage} from "react-intl";
import {Context} from "./Wrapper";
import {Container, Navbar} from "react-bootstrap";

function LanguagesBar() {

    const context = useContext(Context)


    return (
        <div>
            <Container fluid>
                <Navbar style={{marginTop: "10px", background: "white", border: "1px solid rgb(223,223,233)"}}>
                    <Navbar.Brand>
                        <select
                            // @ts-ignore
                            value={context.locale} onChange={context.selectLang}>
                            <FormattedMessage id='language.english'>
                                {(message) => <option value='en-US'>{message}</option>}
                            </FormattedMessage>
                            <FormattedMessage id='language.russian'>
                                {(message) => <option value='ru-RU'>{message}</option>}
                            </FormattedMessage>
                        </select>
                    </Navbar.Brand>
                </Navbar>
            </Container>
        </div>
    );
}

export default LanguagesBar;