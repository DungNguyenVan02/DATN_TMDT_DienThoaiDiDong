// import React, { useEffect, useRef, useState } from 'react';
// import { apiGetProducts } from '~/apis/products';
// import { CountDown } from '~/components/common';
// import { formatTimes, renderStar } from '~/utiles/helper';

// const DailySale = () => {
//     // const idInterval = useRef();

//     // const [hours, setHours] = useState(0);
//     // const [minutes, setMinutes] = useState(0);
//     // const [seconds, setSeconds] = useState(0);
//     // const [expired, setExpired] = useState(false);
//     // useEffect(() => {
//     //     if (deadDaily?.time) {
//     //         const deltaTime = deadDaily.time - Date.now();
//     //         const times = formatTimes(deltaTime);
//     //         setSeconds(times.s);
//     //         setMinutes(times.m);
//     //         setHours(times.h);
//     //     }
//     // }, [deadDaily]);

//     // const fetchDeadDaily = async () => {
//     //     const response = await apiGetProducts({
//     //         limit: 1,
//     //         page: Math.floor(Math.random() * 5),
//     //         sort: '-totalRatings',
//     //     });
//     //     if (response.success) {
//     //         dispatch(
//     //             getDeadDaily({
//     //                 data: response.products[0],
//     //                 time: Date.now() + 24 * 60 * 60 * 1000,
//     //             }),
//     //         );
//     //     }
//     // };

//     // useEffect(() => {
//     //     idInterval.current = setInterval(() => {
//     //         if (seconds > 0) {
//     //             setSeconds((prev) => prev - 1);
//     //         } else {
//     //             if (minutes > 0) {
//     //                 setMinutes((prev) => prev - 1);
//     //                 setSeconds(59);
//     //             } else {
//     //                 if (hours > 0) {
//     //                     setHours((prev) => prev - 1);
//     //                     setMinutes(59);
//     //                     setSeconds(59);
//     //                 } else {
//     //                     setExpired(!expired);
//     //                 }
//     //             }
//     //         }
//     //     }, 1000);

//     //     return () => clearInterval(idInterval.current);
//     // }, [seconds, minutes, hours, expired]);
//     return (
//         <div className="border p-2">
//             <h3 className="text-[24px] font-medium text-center">Ưu đãi hàng ngày</h3>
//             <img
//                 className="w-[270px] object-cover mx-auto"
//                 src="https://digital-world-2.myshopify.com/cdn/shop/products/Untitled-1_31cc1c0e-ac34-4c8e-946a-a5e30acf6b1a_345x550.jpg?v=1491404855"
//                 alt=""
//             />
//             <div className="flex flex-col items-center text-[16px]">
//                 <h3 className="line-clamp-1 text-[20px] font-medium">Iphone 15 pro max</h3>
//                 <div className="flex items-center gap-1">{renderStar(5)}</div>
//                 <span className="text-[]">40000000 VND</span>
//             </div>
//             <div className="flex justify-center items-center gap-4">
//                 <CountDown unit="Giờ" />
//                 <CountDown unit="Phút" />
//                 <CountDown unit="Giây" />
//             </div>
//         </div>
//     );
// };

// export default DailySale;
