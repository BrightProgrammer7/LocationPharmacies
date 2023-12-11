import { React, useEffect, useState, useReducer } from 'react';
import { Dna } from 'react-loader-spinner';
import Select from 'react-select'
import Button from 'react-bootstrap/Button';
import Cards from './Cards';
import Map from './Map';

const gardeData = [
    { value: 'jour', label: 'Jour' },
    { value: 'nuit', label: 'Nuit' },
]

const URL = 'https://pharma-tldq.onrender.com';

const defaultCity = { value: "city", label: "Select City" };
const defaultZone = { value: "zone", label: "Select City" };
const defaultGarde = { value: "garde", label: "Select Garde" };

const initialState = {
    cities: null,
    city: null,
    zones: null,
    zone: null,
    garde: null
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_CITIES':
            return { ...state, cities: action.payload };
        case 'SET_CITY':
            return { ...state, city: action.payload };
        case 'SET_ZONES':
            return { ...state, zones: action.payload };
        case 'SET_ZONE':
            return { ...state, zone: action.payload };
        case 'SET_GARDE':
            return { ...state, garde: action.payload };
        default:
            throw new Error(`Unsupported action type: ${action.type}`);
    }
}


const Main = ({ networkStatus }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [pharmacies, setPharmacies] = useState(null);
    const [getData, setGetData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingCites, setLoadingCites] = useState(false);

    useEffect(() => {
        setLoadingCites(true);
        fetch(`${URL}/api/cities`)
            .then(response => response.json())
            .then(data => {
                const options = data.map(item => ({ value: item._id, label: item.name }));
                dispatch({ type: 'SET_CITIES', payload: options });
            })
            .catch(error => console.error("error"));

        state.city && fetch(`${URL}/api/cities/${state.city.value}/zones`)
            .then(response => response.json())
            .then(data => {
                const options = data.map(item => ({ value: item._id, label: item.name }));
                dispatch({ type: 'SET_ZONES', payload: options });
            })
            .catch(error => console.error(error));
    }, [state.city, state.zone, state.garde]);


    const isCity = !state.city;
    const isZone = !state.zone;
    const isGarde = !state.garde;

    const handleCityChange = data => {
        dispatch({ type: 'SET_CITY', payload: data });
        dispatch({ type: 'SET_ZONE', payload: null });
        dispatch({ type: 'SET_GARDE', payload: null });
        setGetData(false);
        setPharmacies(null);
    };

    const handleZoneChange = data => {
        dispatch({ type: 'SET_ZONE', payload: data });
        dispatch({ type: 'SET_GARDE', payload: null });
    }

    const handleGardeChange = data => {
        dispatch({ type: 'SET_GARDE', payload: data });
    }

    const handleGetPharmacies = data => {
        setLoading(true);
        console.log(`${URL}/api/pharmacies/${state.garde.value}/${state.zone.value}/${state.city.value}`)
        fetch(`${URL}/api/pharmacies/${state.garde.value}/${state.zone.value}/${state.city.value}`)
            .then(response => response.json())
            .then(data => {
                if (data.length) {
                    setPharmacies(data);
                }
                else {
                    dispatch({ type: 'SET_CITY', payload: null });
                    dispatch({ type: 'SET_ZONE', payload: null });
                    dispatch({ type: 'SET_GARDE', payload: null });
                    setPharmacies(null);
                }
                setLoading(false);
                setGetData(true);
            })
            .catch(error => console.log(error));
    }

    const handleRestPharmacies = data => {
        dispatch({ type: 'SET_CITY', payload: null });
        dispatch({ type: 'SET_ZONE', payload: null });
        dispatch({ type: 'SET_GARDE', payload: null });
        setPharmacies(null);
        setGetData(false);

    }

    return (
        <div>
            <div className='d-flex justify-content-center myMain'>
                <div className='mx-3 flex-grow-1 itms'>
                    <Select
                        options={state.cities || []}
                        defaultValue={defaultCity}
                        value={state.city}
                        onChange={handleCityChange}
                        isDisbaled={loadingCites}
                    />
                </div>
                <div className='mx-3 flex-grow-1 itms'>
                    <Select
                        options={state.zones || []}
                        defaultValue={defaultZone}
                        value={state.zone}
                        onChange={handleZoneChange}
                        isDisabled={isCity}
                    />
                </div>
                <div className='mx-3 flex-grow-1 itms'>
                    <Select
                        options={gardeData}
                        defaultValue={defaultGarde}
                        value={state.garde}
                        onChange={handleGardeChange}
                        isDisabled={isZone}
                    />
                </div>
                <div className='mx-3 itms'>
                    <Button
                        onClick={handleGetPharmacies}
                        variant="outline-primary"
                        disabled={isGarde}
                    >
                        Search
                    </Button>
                    {
                        pharmacies?.length &&
                        <Button
                            onClick={handleRestPharmacies}
                            variant="outline-success"
                            className='mx-2'
                        >
                            Reset
                        </Button>
                    }
                </div>
            </div>

            <div className='cardsContainer row mx-3 justify-content-center'>
                {loading ?
                    <Dna
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="dna-loading"
                        wrapperStyle={{}}
                        wrapperClass="dna-wrapper"
                    />
                    :
                    getData ?
                        pharmacies?.length ?
                            <>
                                <div className='my-3'>
                                    <h3>Nombre de pharmacies trouvées : <span className='text-success'>{pharmacies.length}</span></h3>
                                </div>
                                <Cards data={pharmacies} />
                                <Map data={pharmacies} />
                            </>
                            :
                            <div>Not Found!</div>
                        :
                        <div>
                            Search a Pharmacy
                        </div>
                }

            </div>
        </div>
    )
}

export default Main;
