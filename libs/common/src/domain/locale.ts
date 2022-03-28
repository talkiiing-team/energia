import { ElementType } from './element'

export const ELEMENT_TYPE_LOCALE: Record<ElementType, string> = {
  ac: 'источник переменного тока',
  voltmeter: 'вольтметр',
  ampermeter: 'амперметр',
  capacitor: 'конденсатор',
  dc: 'источник постоянного тока',
  inductor: 'катушка индуктивности',
  resistor: 'резистор',
  // breaker: 'разрыв',
  get breaker() {
    return `разрыв${window.a ? ' очка' : ''}`
  },
  jumper: 'перемычка',
}
