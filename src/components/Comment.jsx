import React from 'react';

const Comment = ({comment}) => {
    const {name, email, body} = comment;
    
    return (
        <div className='text-slate-500 mx-8 mb-4'>
            <div className='flex items-center gap-5'>
                <p className='text-slate-800 text-lg font-medium'>{name}</p>
                <p className='font-medium'>{email}</p>
            </div>
            <p>{body}</p>
        </div>
    );
};

export default Comment;