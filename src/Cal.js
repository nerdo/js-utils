const defaults = {
  represent: {
    unit: 'month'
  }
}

export class Cal {
  // constructor(args = defaults.constructor) {
  //   const {
  //     DateAdapter = defaults.constructor.DateAdapter
  //   } = args
  //   this.DateAdapter = DateAdapter
  // }

  represent (args = defaults.represent) {
    const {
      unit = defaults.represent.unit
    } = args

    return {
      unit
    }
  }
}

module.exports.Cal = Cal
export default Cal
