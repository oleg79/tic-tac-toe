import ShallowRenderer from 'react-test-renderer/shallow'
import Cell, { OCell, XCell } from './'
import EmptyCell from '../EmptyCell'

describe('Cell test', () => {
  const renderer = new ShallowRenderer()
  const props = { row: 1, cell: 1 }

  it('should render XCell', () => {
    renderer.render(<Cell {...props} cellType={'X'}/>)
    const actual = renderer.getRenderOutput()
    const expected = <XCell/>

    expect(actual).toEqualJSX(expected)
  })


  it('should render OCell', () => {
    renderer.render(<Cell {...props} cellType={'O'}/>)
    const actual = renderer.getRenderOutput()
    const expected = <OCell/>

    expect(actual).toEqualJSX(expected)
  })


  it('should render EmptyCell', () => {
    renderer.render(<Cell {...props}/>)
    const actual = renderer.getRenderOutput()
    const expected = <EmptyCell {...props}/>

    expect(actual).toEqualJSX(expected)
  })
})