import React, {useEffect, useState} from 'react';
import {Col, Modal, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import {RootStateType} from "../redux/reducers/RootReducers";
import ReactStars from 'react-stars'
import spinner from "../img/spinner.svg";
import _ from "lodash";
import {FormattedMessage, useIntl} from "react-intl";

function CharacteristicsModal(props) {

    const intl = useIntl()
    const {breed} = useSelector((state: RootStateType) => state.breed)
    const [characteristicsList, setCharacteristicsList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (characteristicsList.length === 0) {
            for (let key in breed) {
                if (breed.hasOwnProperty(key)) {
                    if (typeof breed[key] === "number") {
                        characteristicsList.push({name: key, value: breed[key]})
                    }
                }
            }
            setCharacteristicsList(_.orderBy(characteristicsList, ['name'], ['asc']))
            setLoading(false)
        }
    }, [breed])

    return (
        <div>
            {loading === true ?
                <div>
                    <img alt="" src={spinner}
                         style={{resize: "both", width: "100%", height: "128px"}}/>
                </div>
                :
                <div>
                    <Modal{...props}>
                        <Modal.Header closeButton>
                            <Modal.Title>{breed.name}’s <FormattedMessage id="characteristic.title"/></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {
                                characteristicsList.map(characteristic =>
                                    <div>
                                        <Row>
                                            <Col lg={4}>
                                                <b style={{
                                                    display: "block",
                                                    float: "left",
                                                    marginTop: "9px",
                                                    marginRight: "5px"
                                                }}>
                                                    {intl.formatMessage({id: `object.field.${characteristic.name}`})}
                                                </b>
                                            </Col>
                                            <Col lg={8}>
                                                <ReactStars
                                                    count={5}
                                                    size={26}
                                                    edit={false}
                                                    value={characteristic.value}
                                                    color={'#ffd700'}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                )
                            }
                        </Modal.Body>
                    </Modal>
                </div>
            }
            <br/>
        </div>
    );
}

export default CharacteristicsModal;