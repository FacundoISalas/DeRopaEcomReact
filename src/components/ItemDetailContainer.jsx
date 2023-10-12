import React from "react";
import React, { useEffect, useState } from 'react'; // eslint-disable-line
import { useParams } from 'react-router-dom';

const itemDetailContainer = () => {
    const [product, setProduct] = useState(null);
}

const itemId = useParams()

useEffect(() => {
    console.log('getByItemId');
})

return(
    <div>
        <h1>itemDetail</h1>
    </div>
)