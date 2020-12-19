import React from 'react';

function FloatButton(props) {
    return (
        <div style={{position: 'fixed', bottom: 50, right: 50, cursor: 'pointer'}}>
            <div style={{
                borderRadius: 50,
                width: 60,
                height: 60,
                background: '#dc3545',
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                color: '#fff',
                boxShadow: '2px 2px 3px #999'
            }}
                 onClick={props.onClick}
            >
                <i className='fa fa-plus'/>
            </div>
        </div>
    );
}

export {FloatButton};