import _ from 'lodash'
export class GameConfig {
  static get Cards () {
    return [
      { 'bonus': 20, 'wild': 0, 'scatter': 60, 'ss0': 90, 'ss1': 110, 'ss2': 110, 'ss3': 110, 'ss4': 115, 'ns0': 80, 'ns1': 60, 'ns2': 55, 'ns3': 45, 'ns4': 40, 'ns5': 40 },
      { 'bonus': 20, 'wild': 55, 'scatter': 60, 'ss0': 70, 'ss1': 80, 'ss2': 80, 'ss3': 80, 'ss4': 80, 'ns0': 80, 'ns1': 80, 'ns2': 60, 'ns3': 35, 'ns4': 30, 'ns5': 30 },
      { 'bonus': 20, 'wild': 50, 'scatter': 50, 'ss0': 25, 'ss1': 25, 'ss2': 25, 'ss3': 35, 'ss4': 40, 'ns0': 50, 'ns1': 50, 'ns2': 50, 'ns3': 40, 'ns4': 30, 'ns5': 30 },
      { 'bonus': 20, 'wild': 50, 'scatter': 20, 'ss0': 20, 'ss1': 25, 'ss2': 30, 'ss3': 30, 'ss4': 30, 'ns0': 50, 'ns1': 40, 'ns2': 30, 'ns3': 20, 'ns4': 15, 'ns5': 15 },
      { 'bonus': 20, 'wild': 0, 'scatter': 10, 'ss0': 25, 'ss1': 25, 'ss2': 25, 'ss3': 25, 'ss4': 25, 'ns0': 30, 'ns1': 35, 'ns2': 40, 'ns3': 30, 'ns4': 30, 'ns5': 30 }
    ]
  }
  static get CardList () {
    return ['bonus', 'scatter', 'wild', 'ss0', 'ss1', 'ss2', 'ss3', 'ss4', 'ns0', 'ns1', 'ns2', 'ns3', 'ns4', 'ns5']
  }
  static get LevelConfig () {
    return [1.0, 3.0, 5.0, 10.0, 20.0]
  }
  static get BetConfig () {
    // default index is 3
    return [0.1, 0.2, 0.5, 1.0, 2.0, 5.0, 10.0, 20.0, 50.0, 100.0]
  }
  static get KeyToCard () {
    return _.reduce(
      GameConfig.CardList,
      (result, value, indexKey) => {
        const obj = {}
        obj[indexKey] = value
        return {
          ...result,
          ...obj
        }
      }, {})
  }
  static get CardToKey () {
    return _.invert(GameConfig.KeyToCard)
  }
  static get Paytable () {
    /**
     * col0: bonus
     * col1: scatter
     * col2: wild
     * col3-col7: ss0-ss4
     * col8-col13: ns0-ns5
     */
    return [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 0 times
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 1 times
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 2 times
      [0, 5, 0, 100, 50, 40, 25, 10, 5, 5, 5, 5, 5, 5], // 3 times
      [0, 10, 0, 200, 100, 80, 50, 20, 10, 10, 10, 10, 10, 10], // 4 times
      [0, 50, 0, 1000, 500, 400, 250, 100, 50, 50, 50, 50, 50, 50] // 5 times
    ]
  }

  static get OmitCardsOfReel () {
    return {
      'bonus': ['scatter', 'wild'],
      'scatter': ['bonus', 'wild'],
      'wild': ['bonus', 'scatter'],
      'NULL!': []
    }
  }
  static get OmitCardsOfGrid () {
    return {
      'bonus': ['scatter'],
      'scatter': ['bonus'],
      'NULL!': []
    }
  }
}
