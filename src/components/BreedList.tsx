import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../redux/reducers/RootReducers";
import spinner from "../img/spinner.svg"
import search from "../img/loupe.png"
import {Button, Container, Form, Navbar} from "react-bootstrap"
import {fetchBreedsAction, loadFavorite, loadOrigins} from "../redux/actions/BreedsAction";
import Select from "react-select";
import _ from "lodash";
import CardBreed from "./CardBreed";
import {FixedSizeGrid} from "react-window";
import CharacteristicsModal from "./CharacteristicsModal";
import CreateBreedModal from "./CreateBreedModal";
import LoadBreedModal from "./LoadBreedModal";
import {FormattedMessage} from "react-intl";

function BreedList() {

    const dispatch = useDispatch()
    const {breeds, loading, favoriteBreedsNameStorage} = useSelector((state: RootStateType) => state.breed)
    const [originList, setOriginList] = useState([])
    const [filterList, setFilterList] = useState([])
    const [isShowFavorites, setIsShowFavorites] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState([])
    const [showCharacteristicsModal, setShowCharacteristicsModal] = useState(false)
    const [showCreateBreedModal, setShowCreateBreedModal] = useState(false)
    const [showLoadBreedModal, setShowLoadBreedModal] = useState(false)

    useEffect(() => {
        if (breeds.length === 0) {
            dispatch(fetchBreedsAction.request(true))
            if (localStorage.getItem('favorites') !== null && localStorage.getItem('favorites') !== "") {
                dispatch(loadFavorite(localStorage.getItem('favorites').split(",")))
            }
        } else {
            let list = []
            breeds.map(breed => {
                if (!list.some(e => e.value === breed.origin)) {
                    list.push({value: breed.origin, label: breed.origin})
                }
            })
            dispatch(loadOrigins(_.orderBy(list, ['label'], ['asc'])))
            setOriginList(_.orderBy(list, ['label'], ['asc']))
            setFilterList(breeds)
        }
    }, [breeds])


    const createArrayNames = (list) => {
        let arrayFavorite = []
        list.map(item => {
            arrayFavorite.push({'name': item})
        })
        return arrayFavorite
    }

    const createArrayOptionOrigins = (list) => {
        let arrayOptionOrigins = []
        list.map(breed => {
            if (!arrayOptionOrigins.some(item => item.value === breed.origin)) {
                arrayOptionOrigins.push({value: breed.origin, label: breed.origin})
            }
        })
        return arrayOptionOrigins
    }

    const createArrayOrigins = (list) => {
        let arrayOrigins = [];
        list.map(item => {
            arrayOrigins.push({origin: item.label})
        })
        return arrayOrigins
    }

    const resetFilterFavorite = () => {
        if (selectedOptions.length !== 0) {
            setFilterList(_.difference(breeds, _.differenceBy(breeds, createArrayOrigins(selectedOptions), 'origin')))
        } else {
            setDefaultList()
        }
        setIsShowFavorites(false)
    }

    const setListWithFavorites = () => {
        let newFilterList = _.difference(filterList, _.differenceBy(filterList, createArrayNames(favoriteBreedsNameStorage), 'name'))
        setFilterList(newFilterList)
        setOriginList(_.orderBy(createArrayOptionOrigins(newFilterList), ['label'], ['asc']))
    }

    const setDefaultList = () => {
        setFilterList(breeds)
        setOriginList(_.orderBy(createArrayOptionOrigins(breeds), ['label'], ['asc']))
    }

    const showFavorite = (event) => {
        setIsShowFavorites(event.target.checked)
        if (event.target.checked) {
            setListWithFavorites()
        } else if (selectedOptions.length === 0) {
            setDefaultList()
        } else {
            setFilterList(_.difference(breeds, _.differenceBy(breeds, createArrayOrigins(selectedOptions), 'origin')))
            setOriginList(_.orderBy(createArrayOptionOrigins(breeds), ['label'], ['asc']))
        }
    }

    const changeSelectedOptions = (value) => {
        setSelectedOptions(value)
        if (value.length !== 0) {
            let origins = createArrayOrigins(value)
            if (isShowFavorites) {
                let listWithFavoriteBreeds = _.difference(breeds, _.differenceBy(breeds, createArrayNames(favoriteBreedsNameStorage), 'name'))
                setFilterList(_.difference(listWithFavoriteBreeds, _.differenceBy(listWithFavoriteBreeds, origins, 'origin')))
            } else {
                setFilterList(_.difference(breeds, _.differenceBy(breeds, origins, 'origin')))
            }
        } else if (isShowFavorites) {
            let newFilterList = _.difference(breeds, _.differenceBy(breeds, createArrayNames(favoriteBreedsNameStorage), 'name'))
            setFilterList(newFilterList)
            setOriginList(_.orderBy(createArrayOptionOrigins(newFilterList), ['label'], ['asc']))
        } else {
            setDefaultList()
        }
    }

    const showCard = (rowIndex, columnIndex) => {
        if (3 * rowIndex + columnIndex < filterList.length) {
            const currentBreed = filterList[3 * rowIndex + columnIndex]
            // CHECK THIS, BECAUSE JSON FROM API HAS MISTAKES!!!
            if (currentBreed.name !== "European Burmese" && currentBreed.name !== "Malayan") {
                return (
                    <div>
                        <CardBreed
                            breed={currentBreed}
                            onOpen={() => setShowCharacteristicsModal(true)}
                        />
                    </div>
                )
            }
        }
    }

    const showModal = () => {
        if (showCharacteristicsModal) {
            return (
                <div>
                    <CharacteristicsModal
                        show={showCharacteristicsModal}
                        onHide={() => setShowCharacteristicsModal(false)}
                    />
                </div>
            )
        }
        if (showCreateBreedModal) {
            return (
                <div>
                    <CreateBreedModal
                        show={showCreateBreedModal}
                        onHide={() => setShowCreateBreedModal(false)}
                    />
                </div>
            )
        }
        if (showLoadBreedModal) {
            return (
                <div>
                    <LoadBreedModal
                        show={showLoadBreedModal}
                        onHide={() => setShowLoadBreedModal(false)}
                    />
                </div>
            )
        }
    }

    const showContent = () => {
        if (filterList.length !== 0) {
            return (
                <div>
                    {showModal()}
                    <FixedSizeGrid
                        className="Grid"
                        columnCount={3}
                        rowCount={filterList.length / 3 + 1}
                        columnWidth={500}
                        height={505}
                        width={1520}
                        rowHeight={525}
                        style={{border: "none", marginTop: "30px"}}
                    >
                        {Cell}
                    </FixedSizeGrid>
                </div>
            )
        } else {
            return (
                <div>
                    <h1 className={"text-center"} style={{marginTop: "20px"}}>
                        <img alt="" src={search} style={{resize: "both", width: "128px", height: "128px"}}/>
                        <h1><FormattedMessage id="filter.error.header"/></h1>
                        <p><FormattedMessage id="filter.error.text"/></p>
                        <Button variant="primary" onClick={() => {
                            resetFilterFavorite()
                        }}>
                           <FormattedMessage id="filter.error.reset"/>
                        </Button>
                    </h1>
                </div>
            )
        }
    }

    const Cell = ({columnIndex, rowIndex, style}) => (
        <div style={style}>
            {showCard(rowIndex, columnIndex)}
        </div>
    );

    return (
        <div>
            {loading === true ?
                <div>
                    <img alt="" src={spinner} style={{resize: "both", width: "100%", height: "128px"}}/>
                </div>
                :
                <Container fluid>
                    <Navbar style={{marginTop: "10px", background: "white", border: "1px solid rgb(223,223,233)"}}>
                        <Navbar.Brand>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                label={<FormattedMessage id="navbar.favorite"/>}
                                checked={isShowFavorites}
                                onClick={(event) => {
                                    showFavorite(event)
                                }}
                            />
                        </Navbar.Brand>
                        <Navbar.Collapse className="justify-content-end">
                            <Select
                                isMulti
                                onChange={changeSelectedOptions}
                                placeholder={<FormattedMessage id="navbar.select"/>}
                                options={originList}
                            />
                        </Navbar.Collapse>
                    </Navbar>
                    <Button variant="primary" style={{marginTop: "20px"}} onClick={() => setShowCreateBreedModal(true)}>
                        <FormattedMessage id="breedList.create"/>
                    </Button>
                    {' '}
                    <Button variant="success" style={{marginTop: "20px"}} onClick={() => setShowLoadBreedModal(true)}>
                        <FormattedMessage id="breedList.load"/>
                    </Button>
                    {showContent()}
                </Container>
            }
            <br/>
        </div>
    );
}

export default BreedList
