const Moves = ({ moves = [] }) =>
  <div className='flex-1 text-center'>
    <h4>MOVES:</h4>
    {
      moves.map((move, i) => <div key={i} className='my-2'>[ { move[0] }, { move[1] } ]</div>)
    }
  </div>

export default Moves
