import ShallowRenderer from 'react-test-renderer/shallow'

const TestComponent = ({test}) =>
  <div>
    <h3>Test</h3>
    <div>{ test }</div>
  </div>

describe('TestComponent', () => {

  it('It should...', () => {
    const renderer = new ShallowRenderer()
    renderer.render(<TestComponent test={'ololo'} />)
    const result = renderer.getRenderOutput()

    expect(result.type).toBe('div')
    expect(result.props.children).toEqual([
      <h3>Test</h3>,
      <div>ololo</div>
    ])
  })
})
