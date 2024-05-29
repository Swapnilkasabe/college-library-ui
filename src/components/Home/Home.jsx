import React from 'react';
import '../../commonStyles/Pages.css';
import Books from './Books'; 
import ReturnedBooks from './returnedBooks'; 
import BorrowedBooks from './borrowedBooks'; 
import IssueBooks from './issueBooks'; 

const Home = () => {
  return (
    <div className='home'>
        <div className='box box1'><Books/></div>
        <div className='box box2'><BorrowedBooks/></div>
        <div className='box box3'><ReturnedBooks/></div>
        <div className='box box4'><IssueBooks/></div>
        <div className='box box5'>box5</div>
        <div className='box box6'>box6</div>
        <div className='box box7'>box7</div>
        <div className='box box8'>box8</div>
    </div>
  )
}

export default Home;
