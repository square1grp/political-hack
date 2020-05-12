import visActions from './action';

const initialState = {
  candidates: {
    // nodes: [],
    // links: []
    nodes: [{ "id": 0, "c_id": "P00011569", "name": "753, JO", "party": "NNE" }, { "id": 1, "c_id": "P40002172", "name": "AABBATTE, MICHAEL THOMAS WITORT", "party": "IND" }, { "id": 2, "c_id": "H0UT03227", "name": "AADLER, TIM", "party": "REP" }, { "id": 3, "c_id": "H4UT04052", "name": "AALDERS, TIM", "party": "IAP" }, { "id": 4, "c_id": "S2UT00229", "name": "AALDERS, TIMOTHY NOEL", "party": "CON" }, { "id": 5, "c_id": "H0TX22260", "name": "AALOORI, BANGAR REDDY", "party": "REP" }, { "id": 6, "c_id": "H6PA16106", "name": "AAMODT, NORMAN O.", "party": "REP" }, { "id": 7, "c_id": "H2CA01110", "name": "AANESTAD, SAMUEL", "party": "REP" }, { "id": 8, "c_id": "H8CO06237", "name": "AARESTAD, DAVID", "party": "DEM" }, { "id": 9, "c_id": "H8CA18053", "name": "AAROE, KEN", "party": "LIB" }],
    links: [{ "source": 2, "target": 5 }, { "source": 2, "target": 6 }, { "source": 2, "target": 7 }, { "source": 5, "target": 6 }, { "source": 5, "target": 7 }, { "source": 6, "target": 7 }]
  }
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case visActions.FETCH_DATA_SUCCESS:
      return {
        candidates: action.candidates
      }

    case visActions.FETCH_DATA_FAILED:
      return {
        candidates: []
      }

    default:
      return state;
  }
}
