export const updateObject = 
  <State, K extends keyof State>(
    oldObject: State, 
    updatedProperties: Pick<State, K>
  ): State => {
  return {
    ...oldObject,
    ...updatedProperties
  }
}