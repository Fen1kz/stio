export const gameClientInput = (inputPack) => ({
  type: 'gameClientInput'
  , data: {inputPack}
  , meta: {socket: true}
});

export const client$gameClientInput = (inputPack) => (dispatch, getState) => {
  if (inputPack.actions.length > 0) {
    console.log('client$gameClientInput', inputPack);
    dispatch(gameClientInput(inputPack))
  }
};