import React, { ReactNode, useState } from 'react';
import EthicsGridComponent from './EthicsCardGrouper';

interface EthicsGridProps {
    itemsPerPage:number
    GridComponent:React.ReactElement
}

const YourScreenComponent2: React.FC<EthicsGridProps> = ({itemsPerPage ,GridComponent }) => {

    const [currentPage, setCurrentPage] = useState(1);


    
    const totalPages = Math.max(
        Math.ceil(GridComponent.props.cardInputList.length / itemsPerPage),
    );

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const renderPaginationButtons = () => (
        <div style={{ marginTop: '1vh', display: 'flex', justifyContent: 'center' }}>
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    style={{
                        margin: '5px',
                        padding: '5px 10px',
                        backgroundColor: currentPage === index + 1 ? '#022345' : '#808080',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>

            <div style={{ position: 'relative' }}>
                <span
                    style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        fontSize: '16px',
                        color: '#022345',
                    }}
                >
                    
                    Page {currentPage} of {totalPages}
                </span>
            </div>

              <div style={{ position: 'relative' }}>
                {renderPaginationButtons()}
                <EthicsGridComponent
                    key={`ethicsGrid-${currentPage}`} // Include currentPage in the key
                    cardInputList={GridComponent.props.cardInputList.slice(
                        (currentPage - 1) * itemsPerPage,
                        currentPage * itemsPerPage
                    )}
                    rowSpacing={GridComponent.props.rowSpacing}
                    numberOfItemsPerRow={GridComponent.props.numberOfItemsPerRow}
                    CardStatus={GridComponent.props.CardStatus}
                />
            </div>

        </div>
    );
};

export default YourScreenComponent2;