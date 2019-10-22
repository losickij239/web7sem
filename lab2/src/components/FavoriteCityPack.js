import React, {Component} from 'react'
import MiniCityInfo from './MiniCityInfo'
import {doAddItem, doChangeInput, itemsFetchData} from "../actions/items";
import {connect} from "react-redux";

class FavoriteCityPack extends Component {

    handleSubmit = (event) => {
       event.preventDefault();
       console.log(this.props.newCityValue);
       this.props.add(this.props.newCityValue);
    };

    handleChange = (event) => {
        this.props.changeInput(event.target.value);
    };

    render() {
        return (
            <div>
                <div className="container-fluid" style={{paddingRight: 0}}>
                    <div className="inputForm" id="form1">
                        <form onSubmit={this.handleSubmit}>
                            <div className="d-flex justify-content-end" style={{paddingTop: 20, paddingBottom: 15}}>
                                <h3 className="p-2">Город </h3>
                                <input type="text" className="p-2 textbox" style={{marginLeft: 10}}
                                       value={this.props.newCityValue} onChange={this.handleChange}/>
                                <input className="p-2 btn btn-primary" type="submit" value="Добавить в избранное"
                                       style={{marginLeft: 10}}/>
                            </div>
                        </form>
                    </div>
                    <div className="row">
                        {

                            this.props.items.map((favCity, i = 0) => {
                                    i++;
                                    return (
                                        [
                                            <MiniCityInfo serverInfo={favCity}/>,
                                            i % 2 === 0 && <div className="w-100"/>,
                                        ]
                                    )

                                }
                            )

                        }
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        newCityValue: state.newCityValue,
        items: state.items,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url)),
        add: (city) => dispatch(doAddItem(city)),
        changeInput: (input) => dispatch(doChangeInput(input))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteCityPack);
