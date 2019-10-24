export const componentValidatorsMixin = function(componentName = "err-group", property = "componentValid") {
  return {
    computed: {
      componentValidators() {
        return this.$children.map((child) => {
          if(child.name === componentName) {
            return child[property];
          }
        })
      },
      componentValid() {
        return this.componentValidators.every(validator => validator);
      }
    }
  }
};
