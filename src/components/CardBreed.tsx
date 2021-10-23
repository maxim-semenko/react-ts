import React from 'react';
import {Button, Card} from "react-bootstrap";
import star from "../img/star-selected.png";
import nonStar from "../img/star-non-select.png";
import info from "../img/info.png";
import {Link} from "react-router-dom";
import {addFavorite, removeFavorite, setCurrentBreed} from "../redux/actions/BreedsAction";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../redux/reducers/RootReducers";
import {FormattedMessage} from "react-intl";

function CardBreed(props) {

    const dispatch = useDispatch()
    const {favoriteBreedsNameStorage} = useSelector((state: RootStateType) => state.breed)

    const add = (name: string) => {
        dispatch(addFavorite(name))
        let list = favoriteBreedsNameStorage
        list.push(name);
        localStorage.setItem('favorites', list.toString());
    }

    const remove = (name: string) => {
        dispatch(removeFavorite(name))
        let list = favoriteBreedsNameStorage
        list = list.filter(item => item !== name)
        localStorage.setItem('favorites', list.toString());
    }

    return (
        <div>
            <Card style={{width: '29.7rem'}}>
                <div style={{padding: "30px 30px 0px 30px"}}>
                    <Card.Title>
                        <h5 className="text-center">
                            <b>{props.breed.name}</b></h5>
                    </Card.Title>
                    <Card.Img variant="top"
                              src={props.breed.image.url}
                              height="350px"
                    />
                    <Card.Body>
                        <h6 className="text-center">
                            {
                                favoriteBreedsNameStorage.includes(props.breed.name) ?
                                    <img alt="" src={star}
                                         style={{resize: "both", cursor: "pointer"}}
                                         onClick={() => remove(props.breed.name)}/>
                                    :
                                    <img alt="" src={nonStar}
                                         style={{resize: "both", cursor: "pointer"}}
                                         onClick={() => add(props.breed.name)}/>

                            }
                            {' '}
                            <Link to={{pathname: `/breed/${props.breed.name}`}}>
                                <Button variant="primary"
                                        onClick={() => localStorage.setItem("url_image", props.breed.image.url)}>
                                    <FormattedMessage id="breedList.showMore"/>
                                </Button>
                            </Link>
                            {' '}
                            <img alt="" src={info}
                                 style={{resize: "both", cursor: "pointer"}}
                                 onClick={() => {
                                     dispatch(setCurrentBreed(props.breed))
                                     props.onOpen()
                                 }}
                            />
                        </h6>
                    </Card.Body>
                </div>
            </Card>
        </div>
    );
}

export default CardBreed;