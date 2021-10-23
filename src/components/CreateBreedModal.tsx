import React, {useEffect, useRef, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../redux/reducers/RootReducers";
import {createNewBreed} from "../redux/actions/BreedsAction";
import ReactStars from 'react-stars'
import "../style/style.css"
import {FormattedMessage, useIntl} from "react-intl";

function CreateBreedModal(props) {
    const intl = useIntl()
    const dispatch = useDispatch()
    const {origins} = useSelector((state: RootStateType) => state.breed)

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [temperament, setTemperament] = useState('');
    const [origin, setOrigin] = useState(origins[0]);
    const [minWeight, setMinWeight] = useState('');
    const [maxWeight, setMaxWeight] = useState('');

    const [adaptability, setAdaptability] = useState(0)
    const [affectionLevel, setAffectionLevel] = useState(0)
    const [childFriendly, setChildFriendly] = useState(0)
    const [dogFriendly, setDogFriendly] = useState(0)
    const [energyLevel, setEnergyLevel] = useState(0)
    const [experimental, setExperimental] = useState(0)
    const [grooming, setGrooming] = useState(0)
    const [hairless, setHairless] = useState(0)
    const [healthIssues, setHealthIssues] = useState(0)
    const [hypoallergenic, setHypoallergenic] = useState(0)
    const [indoor, setIndoor] = useState(0)
    const [intelligence, setIntelligence] = useState(0)
    const [natural, setNatural] = useState(0)
    const [rare, setRare] = useState(0)
    const [rex, setRex] = useState(0)
    const [sheddingLevel, setSheddingLevel] = useState(0)
    const [shortLegs, setShortLegs] = useState(0)
    const [socialNeeds, setSocialNeeds] = useState(0)
    const [strangerFriendly, setStrangerFriendly] = useState(0)
    const [suppressedTail, setSuppressedTail] = useState(0)
    const [vocalisation, setVocalisation] = useState(0)

    //Errors
    const [nameError, setNameError] = useState('empty')
    const [isNameError, setIsNameError] = useState(false)

    const [descriptionError, setDescriptionError] = useState('empty')
    const [isDescriptionError, setIsDescriptionError] = useState(false)

    const [temperamentError, setTemperamentError] = useState('empty')
    const [isTemperamentError, setIsTemperamentError] = useState(false)

    const [minWeightError, setMinWeightError] = useState('empty');
    const [isMinWeightError, setIsMinWeightError] = useState(false);

    const [maxWeightError, setMaxWeightError] = useState('empty');
    const [isMaxWeightError, setIsMaxWeightError] = useState(false);


    const inputNameRef = useRef(null)
    const inputDescriptionRef = useRef(null)
    const inputTemperamentRef = useRef(null)
    const inputMinWeightRef = useRef(null)
    const inputMaxWeightRef = useRef(null)

    const [baseImage, setBaseImage] = useState("");

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        // @ts-ignore
        setBaseImage(base64);
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };


    const changeName = (event) => {
        setIsNameError(false)
        setName(event.target.value)
    }

    const changeDescription = (event) => {
        setIsDescriptionError(false)
        setDescription(event.target.value)
    }

    const changeTemperament = (event) => {
        setIsTemperamentError(false)
        setTemperament(event.target.value)
    }

    const changeMinWeight = (event) => {
        setIsMinWeightError(false)
        setMinWeight(event.target.value)
    }

    const changeMaxWeight = (event) => {
        setIsMaxWeightError(false)
        setMaxWeight(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!findFormErrors()) {
            let request = {
                name: name, description: description, temperament: temperament, origin: origin.value,
                weight: {
                    imperial: `${minWeight} - ${maxWeight}`
                },
                adaptability: adaptability, affection_level: affectionLevel, child_friendly: childFriendly,
                dog_friendly: dogFriendly, energy_level: energyLevel, experimental: experimental, grooming: grooming,
                hairless: hairless, health_issues: healthIssues, hypoallergenic: hypoallergenic,
                indoor: indoor, intelligence: intelligence, natural: natural,
                rare: rare, rex: rex, shedding_level: sheddingLevel, short_legs: shortLegs, social_needs: socialNeeds,
                stranger_friendly: strangerFriendly, suppressed_tail: suppressedTail, vocalisation: vocalisation,
                image: {
                    url: baseImage,
                }
            }
            // @ts-ignore
            dispatch(createNewBreed(request))
        }
    }


    const findFormErrors = () => {
        let isErrors = false
        let isFocus = false

        if (name.length < 3) {
            isErrors = true
            isFocus = true
            inputNameRef.current.focus()
            setNameError('error.name.short')
            setIsNameError(true)
        }

        // description errors
        if (description.length < 10) {
            isErrors = true
            if (!isFocus) {
                inputDescriptionRef.current.focus()
                isFocus = true
            }
            setDescriptionError('error.description.short')
            setIsDescriptionError(true)
        }

        // temperament errors
        if (temperament.split(',').length < 2) {
            isErrors = true
            if (!isFocus) {
                inputTemperamentRef.current.focus()
                isFocus = true
            }
            setTemperamentError('error.temperament.short')
            setIsTemperamentError(true)
        }

        if (!minWeight) {
            isErrors = true
            if (!isFocus) {
                inputMinWeightRef.current.focus()
                isFocus = true
            }
            setMinWeightError('error.minWeight.empty')
            setIsMinWeightError(true)
        } else if (minWeight > maxWeight) {
            isErrors = true
            if (!isFocus) {
                inputMinWeightRef.current.focus()
                isFocus = true
            }
            setTemperamentError('error.minWeight.big')
            setIsMinWeightError(true)
        }

        if (!maxWeight) {
            isErrors = true
            if (!isFocus) {
                inputMaxWeightRef.current.focus()
            }
            setMaxWeightError('error.maxWeight.empty')
            setIsMaxWeightError(true)
        }

        return isErrors
    }

    return (
        <div>
            <Modal{...props}>
                <Modal.Header closeButton>
                    <Modal.Title><FormattedMessage id="breedList.create"/></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label><FormattedMessage id="create.name"/></Form.Label>
                            <Form.Control type="text" ref={inputNameRef}
                                          onChange={changeName}
                                // @ts-ignore
                                          isInvalid={isNameError}
                            />

                            <Form.Control.Feedback type='invalid'>
                                {intl.formatMessage({id: `${nameError}`})}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label><FormattedMessage id="about.description"/></Form.Label>
                            <Form.Control type="text" ref={inputDescriptionRef}
                                          onChange={changeDescription}
                                // @ts-ignore
                                          isInvalid={isDescriptionError}/>
                            <Form.Control.Feedback type='invalid'>
                                {intl.formatMessage({id: `${descriptionError}`})}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label><FormattedMessage id="about.temperament"/></Form.Label>
                            <Form.Control type="text" ref={inputTemperamentRef}
                                          onChange={changeTemperament}
                                // @ts-ignore
                                          isInvalid={isTemperamentError}/>
                            <Form.Control.Feedback type='invalid'>
                                {intl.formatMessage({id: `${temperamentError}`})}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{marginBottom: "0px"}}><FormattedMessage id="about.origin"/></Form.Label>
                            <Form.Control as="select"
                                          name={"origin"}
                                          onChange={event => setOrigin(JSON.parse(event.target.value))}>
                                {origins.map((option, index) =>
                                    <option key={index} value={JSON.stringify(option)}>
                                        {option.value}
                                    </option>
                                )}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label><FormattedMessage id="about.weight"/></Form.Label>
                            <Form.Control type="number" placeholder="Enter min" onChange={changeMinWeight} min={1}
                                // @ts-ignore
                                          isInvalid={isMinWeightError}/>
                            <Form.Control.Feedback type='invalid'>
                                {intl.formatMessage({id: `${minWeightError}`})}
                            </Form.Control.Feedback>
                            <br/>
                            <Form.Control type="number" placeholder="Enter max" onChange={changeMaxWeight} min={1}
                                // @ts-ignore
                                          isInvalid={isMaxWeightError}/>
                            <Form.Control.Feedback type='invalid'>
                                {intl.formatMessage({id: `${maxWeightError}`})}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <p><FormattedMessage id="create.image"/></p>
                        <input type="file" accept=".png,.jpg" onChange={event => uploadImage(event)}/>
                        <br/>
                        <img alt="" src={baseImage} height="200px"/>
                        <br/>
                        <b className={"characteristics-text"}>
                            {intl.formatMessage({id: "object.field.adaptability"})}
                        </b>
                        <ReactStars onChange={(newRating) => setAdaptability(newRating)}
                                    count={5} half={false} size={26} value={adaptability} color={'#ffd700'}
                        />
                        <b className={"characteristics-text"}>
                            {intl.formatMessage({id: "object.field.affection_level"})}
                        </b>
                        <ReactStars onChange={(newRating) => setAffectionLevel(newRating)}
                                    count={5} half={false} size={26} value={affectionLevel} color={'#ffd700'}
                        />
                        <b className={"characteristics-text"}>
                            {intl.formatMessage({id: "object.field.child_friendly"})}
                        </b>
                        <ReactStars onChange={(newRating) => setChildFriendly(newRating)}
                                    count={5} half={false} size={26} value={childFriendly} color={'#ffd700'}
                        />
                        <b className={"characteristics-text"}>
                            {intl.formatMessage({id: "object.field.dog_friendly"})}
                        </b>
                        <ReactStars onChange={(newRating) => setDogFriendly(newRating)}
                                    count={5} half={false} size={26} value={dogFriendly} color={'#ffd700'}
                        />
                        <b className={"characteristics-text"}>
                            {intl.formatMessage({id: "object.field.energy_level"})}
                        </b>
                        <ReactStars onChange={(newRating) => setEnergyLevel(newRating)}
                                    count={5} half={false} size={26} value={energyLevel} color={'#ffd700'}
                        />
                        <b className={"characteristics-text"}>
                            {intl.formatMessage({id: "object.field.experimental"})}
                        </b>
                        <ReactStars onChange={(newRating) => setExperimental(newRating)}
                                    count={5} half={false} size={26} value={experimental} color={'#ffd700'}
                        />
                        <b className={"characteristics-text"}>
                            {intl.formatMessage({id: "object.field.grooming"})}
                        </b>
                        <ReactStars onChange={(newRating) => setGrooming(newRating)}
                                    count={5} half={false} size={26} value={grooming} color={'#ffd700'}
                        />
                        <b className={"characteristics-text"}>
                            {intl.formatMessage({id: "object.field.hairless"})}
                        </b>
                        <ReactStars onChange={(newRating) => setHairless(newRating)}
                                    count={5} half={false} size={26} value={hairless} color={'#ffd700'}
                        />
                        <b className={"characteristics-text"}>
                            {intl.formatMessage({id: "object.field.health_issues"})}
                        </b>
                        <ReactStars onChange={(newRating) => setHealthIssues(newRating)}
                                    count={5} half={false} size={26} value={healthIssues} color={'#ffd700'}
                        />
                        <b className={"characteristics-text"}>
                            {intl.formatMessage({id: "object.field.hypoallergenic"})}
                        </b>
                        <ReactStars onChange={(newRating) => setHypoallergenic(newRating)}
                                    count={5} half={false} size={26} value={hypoallergenic} color={'#ffd700'}
                        />
                        <b className={"characteristics-text"}>
                            {intl.formatMessage({id: "object.field.indoor"})}
                        </b>
                        <ReactStars onChange={(newRating) => setIndoor(newRating)}
                                    count={5} half={false} size={26} value={indoor} color={'#ffd700'}
                        />
                        <b className={"characteristics-text"}>
                            {intl.formatMessage({id: "object.field.intelligence"})}
                        </b>
                        <ReactStars onChange={(newRating) => setIntelligence(newRating)}
                                    count={5} half={false} size={26} value={intelligence} color={'#ffd700'}
                        />
                        <b className={"characteristics-text"}>
                            {intl.formatMessage({id: "object.field.natural"})}
                        </b>
                        <ReactStars onChange={(newRating) => setNatural(newRating)}
                                    count={5} half={false} size={26} value={natural} color={'#ffd700'}
                        />
                        <b className={"characteristics-text"}>
                            {intl.formatMessage({id: "object.field.rare"})}
                        </b>
                        <ReactStars onChange={(newRating) => setRare(newRating)}
                                    count={5} half={false} size={26} value={rare} color={'#ffd700'}
                        />
                        <b className={"characteristics-text"}>
                            {intl.formatMessage({id: "object.field.rex"})}
                        </b>
                        <ReactStars onChange={(newRating) => setRex(newRating)}
                                    count={5} half={false} size={26} value={rex} color={'#ffd700'}
                        />
                        <b className={"characteristics-text"}>
                            {intl.formatMessage({id: "object.field.shedding_level"})}
                        </b>
                        <ReactStars onChange={(newRating) => setSheddingLevel(newRating)}
                                    count={5} half={false} size={26} value={sheddingLevel} color={'#ffd700'}
                        />
                        <b className={"characteristics-text"}>
                            {intl.formatMessage({id: "object.field.short_legs"})}
                        </b>
                        <ReactStars onChange={(newRating) => setShortLegs(newRating)}
                                    count={5} half={false} size={26} value={shortLegs} color={'#ffd700'}
                        />
                        <b className={"characteristics-text"}>
                            {intl.formatMessage({id: "object.field.social_needs"})}
                        </b>
                        <ReactStars onChange={(newRating) => setSocialNeeds(newRating)}
                                    count={5} half={false} size={26} value={socialNeeds} color={'#ffd700'}
                        />
                        <b className={"characteristics-text"}>
                            {intl.formatMessage({id: "object.field.stranger_friendly"})}
                        </b>
                        <ReactStars onChange={(newRating) => setStrangerFriendly(newRating)}
                                    count={5} half={false} size={26} value={strangerFriendly} color={'#ffd700'}
                        />
                        <b className={"characteristics-text"}>
                            {intl.formatMessage({id: "object.field.suppressed_tail"})}
                        </b>
                        <ReactStars onChange={(newRating) => setSuppressedTail(newRating)}
                                    count={5} half={false} size={26} value={suppressedTail} color={'#ffd700'}
                        />
                        <b className={"characteristics-text"}>
                            {intl.formatMessage({id: "object.field.vocalisation"})}
                        </b>
                        <ReactStars onChange={(newRating) => setVocalisation(newRating)}
                                    count={5} half={false} size={26} value={vocalisation} color={'#ffd700'}
                        />
                    </Form>
                    <Button onClick={handleSubmit}><FormattedMessage id="create.create"/></Button>
                </Modal.Body>
            </Modal>

        </div>
    );
}

export default CreateBreedModal;