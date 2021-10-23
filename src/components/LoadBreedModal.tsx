import Papa from 'papaparse';
import React, {useEffect, useState} from 'react';
import {Button, Container, Form, Modal, Table} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {createNewBreed} from "../redux/actions/BreedsAction";
import {FormattedMessage, useIntl} from "react-intl";

function LoadBreedModal(props) {

    const intl = useIntl()
    const dispatch = useDispatch()
    const [selectsFromJSON, setSelectsFromJSON] = useState([])
    const [currentField, setCurrentField] = useState(0)
    const [currentValue, setCurrentValue] = useState(0)
    const [isOpenFile, setIsOpenFile] = useState(false)

    const [selectsBreedObject, setSelectsBreedObject] = useState(
        [
            "name",
            "description",
            "origin",
            "temperament",
            "minWeight",
            "maxWeight",
            "urlImage",
            "adaptability",
            "affection_level",
            "child_friendly",
            "dog_friendly",
            "energy_level",
            "experimental",
            "grooming",
            "hairless",
            "health_issues",
            "hypoallergenic",
            "indoor",
            "intelligence",
            "lap",
            "natural",
            "rare",
            "rex",
            "shedding_level",
            "short_legs",
            "social_needs",
            "stranger_friendly",
            "suppressed_tail",
        ])

    const [valuesList, setValuesList] = useState([])

    useEffect(() => {
        setCurrentField(0)
        setCurrentValue(0)
    }, [selectsBreedObject, selectsFromJSON])

    const readFile = (event) => {
        const file = event.target.files[0];
        Papa.parse(file, {
            download: true,
            header: false,
            complete: function (results) {
                let temp = []
                // @ts-ignore
                for (let key in results.data[0]) {
                    temp.push(results.data[0][key])
                }
                setSelectsFromJSON(temp)
                setIsOpenFile(true)
            }
        })
    }

    const addValue = () => {
        setValuesList([...valuesList, {field: selectsBreedObject[currentField], value: selectsFromJSON[currentValue]}])
        setSelectsBreedObject(items => items.filter(item => item !== selectsBreedObject[currentField]))
        let temp = selectsFromJSON
        temp.splice(currentValue, 1)
        setSelectsFromJSON(temp)
    }

    const saveBreed = () => {
        let minWeight = valuesList.find(item => item.field === "minWeight")
        let maxWeight = valuesList.find(item => item.field === "maxWeight")
        let urlImage = valuesList.find(item => item.field === "urlImage")
        let request = {
            weight: {
                imperial: `${minWeight.value} - ${maxWeight.value}`
            },
            image: {
                url: urlImage.value
            }
        }
        valuesList.map(item => {
            if (item.field !== "minWeight" && item.field !== "maxWeight" && item.field !== "urlImage") {
                if (item.value >= "0" && item.value < "6") {
                    request[item.field] = Number.parseInt(item.value)
                } else {
                    request[item.field] = item.value

                }
            }
        })
        // @ts-ignore
        dispatch(createNewBreed(request))
        props.onHide()
    }

    const updateFieldChanged = (index) => event => {
        let name = event.target.name
        let newArr = [...valuesList];
        newArr[index] = {field: name, value: event.target.value};
        setValuesList(newArr);
    }

    const showContent = () => {
        if (isOpenFile) {
            if (selectsBreedObject.length === selectsFromJSON.length) {
                return (
                    <div>
                        <Form.Group>
                            <Form.Label style={{marginBottom: "0px"}}><FormattedMessage
                                id="load.fields"/></Form.Label>
                            <Form.Control as="select"
                                          onChange={event => setCurrentField(Number.parseInt(event.target.value))}
                            >
                                {selectsBreedObject.map((option, index) =>
                                    <option key={index} selected={index === currentField} value={index}>
                                        {intl.formatMessage({id: `object.field.${option}`})}
                                    </option>
                                )}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{marginBottom: "0px"}}><FormattedMessage
                                id="load.values"/></Form.Label>
                            <Form.Control
                                as="select"
                                onChange={event => setCurrentValue(Number.parseInt(event.target.value))}
                            >
                                {selectsFromJSON.map((option, index) =>
                                    <option key={index} selected={index === currentValue} value={index}>
                                        {option}
                                    </option>
                                )}
                            </Form.Control>
                        </Form.Group>
                        <Button onClick={addValue}><FormattedMessage id="load.add"/></Button>
                        <br/>
                        <br/>
                        <div>
                            <Container>
                                <Table>
                                    <thead>
                                    <tr>
                                        <th><FormattedMessage id="load.fields"/></th>
                                        <th><FormattedMessage id="load.values"/></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        valuesList.map((item, index) =>
                                            <tr>
                                                <td>
                                                    {intl.formatMessage({id: `object.field.${item.field}`})}
                                                </td>
                                                <td>
                                                    <Form.Control
                                                        type="text"
                                                        name={item.field}
                                                        value={item.value}
                                                        onChange={updateFieldChanged(index)}
                                                    />
                                                </td>
                                            </tr>
                                        )
                                    }
                                    </tbody>
                                </Table>
                            </Container>
                        </div>
                        <Button onClick={saveBreed}><FormattedMessage id="load.save"/></Button>
                    </div>
                )
            } else {
                return (
                    <div>
                        Выберите другой файл!
                    </div>
                )
            }

        }
    }

    return (
        <div>
            <Modal{...props} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title><FormattedMessage id="breedList.load"/></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="file" accept=".csv,.xlsx" onChange={event => readFile(event)}/>
                    {showContent()}
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default LoadBreedModal;