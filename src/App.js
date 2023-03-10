// import React, {Component} from 'react';
// import { createPortal } from 'react-dom';
// import {Container} from 'react-bootstrap';
// import './App.css';

// class Form extends Component {
//     state = {
//         advOpen: false
//     }
//     componentDidMount() {
//         setTimeout(this.handleClick, 3000)
//     }

//     handleClick = () => {
//         this.setState(({advOpen}) => ({
//             advOpen: !advOpen
//         }))
//         console.log('click');
//     }

//     render() {
//         return (
//             <Container>
//                 <form onClick={this.handleClick} className="w-50 border mt-5 p-3 m-auto" 
//                 style={{'overflow': 'hidden', 
//                         'position': 'relative'}}>
//                     <div className="mb-3">
//                         <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
//                         <input  type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
//                         <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
//                     </div>
//                     {
//                         this.state.advOpen ? 
//                         <Portal>
//                             <Msg/>
//                         </Portal> : null
//                     }
                    
//                 </form>
//             </Container>
//         )
//     }
// }
// const Portal = (props) => {
//     const node = document.createElement('div');
//     document.body.appendChild(node);
//     return createPortal(props.children, node);
// }
// const Msg = () => {
//     return (
//         <div 
//                     style={{'width': '500px', 
//                             'height': '150px', 
//                             'backgroundColor': 'red', 
//                             'position': 'absolute', 
//                             'right': '0', 
//                             'bottom': '0'}}>
//                         Hello
//                     </div>
//     )
// }

// function App() {
//     return (
//         <Form/>
//     );
// }

// export default App;


// import {useState, useReducer} from 'react';
// import {Container} from 'react-bootstrap';
// import './App.css';

// function reducer (state, action) {
//     switch (action.type) {
//         case 'toggle':
//             return {autoplay:!state.autoplay}
//         case 'slow' :
//             return {autoplay:300}
//         case 'fast' :
//             return {autoplay:700}
//         case 'custom' :
//             return {autoplay:action.payload}
//         default :
//             throw new Error();
//     }
// }

// function init (initial) {
//     return {autoplay:initial}
// }

// const Slider = ({initial}) => {
//     const [slide, setSlide] = useState(0);
//     // const [autoplay, setAutoplay] = useState(false);
//     const [autoplay, dispatchAutoplay] = useReducer(reducer, initial, init);

//     function changeSlide(i) {
//         setSlide(slide => slide + i);
//     }

//     return (
//         <Container>
//             <div className="slider w-50 m-auto">
//                 <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
//                 <div className="text-center mt-5">Active slide {slide} <br/>{autoplay.autoplay ? autoplay.autoplay : null} </div>
//                 <div className="buttons mt-3">
//                     <button 
//                         className="btn btn-primary me-2"
//                         onClick={() => changeSlide(-1)}>-1</button>
//                     <button 
//                         className="btn btn-primary me-2"
//                         onClick={() => changeSlide(1)}>+1</button>
//                     <button 
//                         className="btn btn-primary me-2"
//                         onClick={() => dispatchAutoplay({type:'toggle'})}>toggle autoplay</button>
//                     <button 
//                         className="btn btn-primary me-2"
//                         onClick={() => dispatchAutoplay({type:'slow'})}>slow autoplay</button>
//                     <button 
//                         className="btn btn-primary me-2"
//                         onClick={() => dispatchAutoplay({type:'fast'})}>fast autoplay</button>
//                     <button 
//                         className="btn btn-primary me-2"
//                         onClick={(e) => dispatchAutoplay({type:'custom', payload: +e.target.textContent})}>1000</button>

//                 </div>
//             </div>
//         </Container>
//     )
// }

// function App() {
//     return (
//         <Slider initial={false}/>
//     );
// }

// export default App;


import {useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';
import BaseComponent from 'bootstrap/js/dist/base-component';

// const f = (a) => {
//     return (b) => {
//         console.log( a + b );
//     }
// }

// f(1)(2);


// const f = (a) => {
//     return class extends Component {
//         render () {
//             return <h1>Hello!</h1>
//         }
//     }
// }

const withSlider = (BaseComponent, getData) => {
    return (props) => {
        const [slide, setSlide] = useState(0);
        const [autoplay, setAutoplay] = useState(false)
    
        useEffect(() => {
            setSlide(getData());
        }, [])
    
        function changeSlide(i) {
            setSlide(slide => slide + i);
        }
        return <BaseComponent
        {...props}
         slide={slide} 
         autoplay={autoplay} 
         setSlide={setSlide} 
         setAutoplay={setAutoplay} 
         changeSlide={changeSlide} />
    }
}

const getDataFromFirstFetch = () => {return 10};
const getDataFromSecondFetch = () => {return 20};

const SliderFirst = props => {
    return (
        <Container>
            <div className="slider w-50 m-auto">
                <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
                <div className="text-center mt-5">Active slide {props.slide}</div>
                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => props.changeSlide(-1)}>-1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => props.changeSlide(1)}>+1</button>
                </div>
            </div>
        </Container>
    )
}

const SliderSecond = (props) => {

    return (
        <Container>
            <div className="slider w-50 m-auto">
                <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
                <div className="text-center mt-5">Active slide {props.slide} <br/>{props.autoplay ? 'auto' : null} </div>
                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => props.changeSlide(-1)}>-1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => props.changeSlide(1)}>+1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => props.setAutoplay(autoplay => !props.autoplay)}>toggle autoplay</button>
                </div>
            </div>
        </Container>
    )
}

const SliderWithFirstFetch = withSlider(SliderFirst, getDataFromFirstFetch);
const SliderWithSecondFetch = withSlider(SliderSecond, getDataFromSecondFetch);

function App() {
    return (
        <>
            <SliderWithFirstFetch />
            <SliderWithSecondFetch />
        </>
    );
}

export default App;
