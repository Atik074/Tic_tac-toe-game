import {useState} from 'react' ;
import   './App.css'



function Square({value , onSquareClick}){


     return(
     <button onClick={onSquareClick} className="w-16 h-16 m-1  border-2 border-gray-400 leading-9 text-xl" >{value}</button> )

}

 function Board({xIsNext , squares, onPlay}){ 
    
    const winner = calculateWinner(squares)
    let status ;

    if(winner){
         status = `Winner : ${winner}`
    }else{
        status = 'Next Player ' + (xIsNext ? 'X' : 'O')
    }

       function handleSquareClick (i){
         
          if(squares[i] || calculateWinner(squares)){
            return ;
          }
         const nextSquares = squares.slice() 

         if(xIsNext){
            nextSquares[i] ="X"
         }else{
            nextSquares[i]="O"
         }
        
         onPlay(nextSquares) 

   }


    return (
       <>
            <div className='text-2xl text-red-700 mb-3'>{status}</div>
         <div className='flex'>
         <Square value={squares[0]} onSquareClick={() => handleSquareClick(0)}/>
         <Square value={squares[1]} onSquareClick={() => handleSquareClick(1)}/>
         <Square value={squares[2]} onSquareClick={() => handleSquareClick(2)}/>
        </div>
           
         <div className='flex justify-center'>
         <Square value={squares[3]} onSquareClick={() => handleSquareClick(3)} />
         <Square value={squares[4]} onSquareClick={() => handleSquareClick(4)}/>
         <Square value={squares[5]} onSquareClick={() => handleSquareClick(5)}/>
         </div>
           
         <div className='flex justify-center'>
         <Square value={squares[6]} onSquareClick={() => handleSquareClick(6)} />
         <Square value={squares[7]} onSquareClick={() => handleSquareClick(7)}/>
         <Square value={squares[8]} onSquareClick={() => handleSquareClick(8)}/>
         </div>
           
       </> 
    );
}

export default function Game(){
    const [history , setHistory] = useState([Array(9).fill(null)]) 
    const [xIsNext , setXisNext] = useState(true) 
    const [currentmove , setCurrentMove] = useState(0)

    const currentSquares = history[currentmove]

    function handlePlay(nextSquares){

           setXisNext(!xIsNext)
           const nextHistory = [...history.slice(0 ,  currentmove + 1) , nextSquares]
           setHistory(nextHistory)
           setCurrentMove(nextHistory.length - 1)
    }

    // to go back function
    function jumpTo(move){
        setCurrentMove(move)
        setXisNext(move / 2 === 0)
    }

    // to get pass history
    const moves = history.map((squares , move) =>{
        let description ;
        if(move > 0){
            description = `Go to the move #${move}`
        }else{
            description ="Go to the start game"
        }

        return(
            <li key={move} className='bg-gray-700 text-white mb-1 p-1 rounded-sm'>
                <button onClick={()=>jumpTo(move)}>{description}</button>
            </li>
        )
    })


    return(
        <div className='flex justify-center p-4'>
            <div className="mr-16">
                <Board 
                  xIsNext={xIsNext}
                  squares ={currentSquares} 
                  onPlay={handlePlay}
                />
            </div>
            <div>
                <ul>
                    <ol className='border border-gray-400 p-1 text-lg'>{moves}</ol>
                </ul>
            </div>
        </div>
    )
}


function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }