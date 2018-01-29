
initialState = {
    mapType: "satellite"
};

export default function states(state = initialState, action) {

    switch (action.type) {
      case 'SET_MAP_TYPE':
        return { ...state, mapType: action.payload }
  
      default:
        return state;
    }

  }