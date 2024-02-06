import StarIcon from '@mui/icons-material/Star';
export default function Navbar () {
    return (
        <nav 
        style = {{
            backgroundColor: '#0B254A',
            color: '#C5C5C5',
            padding: '10px',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between'
        }}>
        
        <ul
            style = {{
                listStyleType: 'none',
                margin: '0',
                padding: '0'
            }}
        
        
        >
            <li style = {{display: 'inline'}}>
                <a href="#" 
                    style={{
                        textDecoration: 'none',
                        padding: '10px',
                        color: 'grey'
                    }}> 
                Home
                </a>
            </li>

            <li style = {{display: 'inline'}}>
                <a href="#"                             
                style={{
                        textDecoration: 'none',
                        padding: '10px',
                        color: 'grey'
                    }}>History</a>
            </li>

            <li style = {{display: 'inline'}}>
                <a href="#"                             
                style={{
                        textDecoration: 'none',
                        padding: '10px',
                        color: 'grey'
                    }}>Account</a>
            </li>
        </ul>


    <div 
        style = {{
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: 'lightblue',
            padding: '5px 10px',
            margin: '0',
            width: '8rem',
            color: 'darkgray',

        }}
    
    
    >
        <span >John Doe</span>
        < StarIcon />
    </div>


        </nav>
    )
  }