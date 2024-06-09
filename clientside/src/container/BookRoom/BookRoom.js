import { useEffect, useState } from "react";
import { Navbar } from "../../components";
import qs from "qs";

const BookRoom = () => {
    const [name, setname] = useState("");
    const [phone, setphone] = useState("");
    const [email, setemail] = useState("");
    const [From, setFrom] = useState("");
    const [To, setTo] = useState("");
    const [kingSize, setkingSize] = useState("");
    const [QueenSize, setQueenSize] = useState("");
    const [familysize, setfamilysize] = useState("");
    const [adult, setadult] = useState();
    const [children, setchildren] = useState();
    const [bookedkingsize, setbookedkingsize] = useState([]);
    const [bookedqueensize, setbookedqueensize] = useState([]);
    const [bookedfamilysize, setbookedfamilysize] = useState([]);
    const [totalkingroom, setTotalkingroom] = useState(0);
    const [totalqueenroom, setTotalqueenroom] = useState(0);
    const [totalfamilyroom, setTotalfamilyroom] = useState(0);
    const [roomnumber, setroomnumber] = useState([]);
    const [bookedDates, setbookedDates] = useState();

    const onchangefrom = (e) => {
        setFrom(e.target.value);
    };

    const onchangeto = (e) => {
        setTo(e.target.value);
    };

    const getroom = () => {
        if (From !== "" && To !== "") {
            fetch(`http://localhost:8081/bookedroominfos/${From}/${To}`)
                .then((response) => response.json())
                .then((result) => {
                    setTotalqueenroom(result[0]);
                    setTotalkingroom(result[1]);
                    setTotalfamilyroom(result[2]);
                    setbookedkingsize(result[3]);
                    setbookedqueensize(result[4]);
                    setbookedfamilysize(result[5]);
                    setbookedDates([From, To]);
                })
                .catch((error) => console.error("Error fetching data:", error));
        }
    };

    useEffect(() => {
        getroom();
    }, [From, To]);

    const addroom = async(event) => {
        event.preventDefault();

        const newTransaction = {
            name: name,
            phone: phone,
            email: email,
            kingsize: kingSize,
            queensize: QueenSize,
            familysize: familysize,
            adult: adult,
            children: children,
            from: From,
            to: To,
        };

       
        if (kingSize !== 0) {
          const array2 = [1, 2, 3, 4, 5];
          for (let i = 0; i < kingSize; i++) {
              const filteredArray2 = array2.filter((num) => !bookedkingsize.includes(num));
              setroomnumber((prevArray) => [...prevArray, filteredArray2[i]]);
              const addbooked = {
                  name: name,
                  phone: phone,
                  kingsize: filteredArray2[i],
                  bookedDates: bookedDates,
                  status: "able",
              };
              addinbooked(addbooked);
          }
      }

        if (QueenSize !== 0) {
            const array3 = [6, 7, 8, 9, 10];
            for (let i = 0; i < QueenSize; i++) {
                const filteredArray3 = array3.filter((num) => !bookedqueensize.includes(num));
                setroomnumber((prevArray) => [...prevArray, filteredArray3[i]]);
                const addbooked = {
                    name: name,
                    phone: phone,
                    queensize: filteredArray3[i],
                    bookedDates: bookedDates,
                    status: "able",
                };
                addinbooked(addbooked);
            }
        }

        if (familysize !== 0) {
            const array4 = [11, 12, 13, 14, 15];
            for (let i = 0; i < familysize; i++) {
                const filteredArray4 = array4.filter((num) => !bookedfamilysize.includes(num));
                setroomnumber((prevArray) => [...prevArray, filteredArray4[i]]);
                const addbooked = {
                    name: name,
                    phone: phone,
                    familysize: filteredArray4[i],
                    bookedDates: bookedDates,
                    status: "able",
                };

                addinbooked(addbooked);
            }
        }
        try {
          const response = await fetch(`http://localhost:8081/Roominfo`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: qs.stringify(newTransaction),
          });
  
          if (!response.ok) {
              throw new Error(`Failed to add user. Status: ${response.status}`);
          }
  
          const data = await response.json();
          console.log('Add successfully', data);
  
          // Use the updated state after it's been set
          setroomnumber((prevArray) => {
              const roomnumberString = prevArray.join(',');
              console.log('Room Numbers:', roomnumberString);
              sendmsg(roomnumberString);
              return prevArray; // Return the unchanged array to avoid unnecessary re-render
          });
      } catch (error) {
          console.error('Error in fetch request:', error);
      }      
    
      

    };

    const addinbooked = (addbooked) => {
        fetch(`http://localhost:8081/bookedroominfo/${From}/${To}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: qs.stringify(addbooked),
        })
            .then((response) => {
                if (response.ok) {
                    console.log('Add successfully');
                } else {
                    console.error('Failed to add user. Status:', response.status);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const sendmsg = (roomnumberString) => {
     
      fetch('http://localhost:8081/sendmsg', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs.stringify({ roomnumber: roomnumberString }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to add user. Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log('Add successfully', data);
        })
        .catch((error) => {
            console.error('Error in fetch request:', error);
        });
  };
  return (
    <>
      <Navbar />
      <div className="app__bg app__wrapper section__padding" id="contact">
        <div className="app__newsletter  ">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addroom(e);
            }}
          >
            <div className="app__newsletter-heading">
              <h1 className="headtext__cormorant">Book Room </h1>
              <p className="p__opensans">
                First, you need to select a date 
              </p>
            </div>
            <div className="app__newsletter-input flex__center">
              <button type="button" className="custom__button">
                Select Date From
              </button>

              <input
                className="input"
                type="date"
                placeholder="select From"
                value={From}
                onChange={onchangefrom}
                required
              />
            </div>
            <div className="app__newsletter-input flex__center">
              <button type="button" className="custom__button">
                Select Date To
              </button>

              <input
                className="input"
                type="date"
                placeholder="select To"
                value={To}
                onChange={onchangeto}
                required
              />
            </div>

            <p className="p__opensans">
                king size prize:$500 
              </p>
            <div className="app__newsletter-input flex__center">
              <button type="button" className="custom__button">
                select how many king size rooms you want
              </button>
              <select
                value={kingSize}
                onChange={(e) => setkingSize(e.target.value)}
                className="select"
                required
              >
                <option value="">Select a king size room</option>
                <option value={0}>0</option>
                {Array.from({ length: totalkingroom }, (_, i) => (
                 <option key={i+1} value={i+1}>
                     {i+1}
                 </option>
                ))}
              </select>
            </div>
            <p className="p__opensans">
                Queen size prize:$200 
              </p>
            <div className="app__newsletter-input flex__center">
              <button type="button" className="custom__button">
                select how many queen size rooms you want
              </button>
              <select
                value={QueenSize}
                onChange={(e) => setQueenSize(e.target.value)}
                className="select"
                required
              >
                <option value="" Disabled>
                  Select a queen size room
                </option>
                <option value={0}>0</option>
                {
                  Array.from(
                    { length: totalqueenroom},
                    (_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    )
                  )}
              </select>
            </div>

            <p className="p__opensans">
                Family size prize:$500 
              </p>
            <div className="app__newsletter-input flex__center">
              <button type="button" className="custom__button">
                select how many family rooms you want
              </button>
              <select
                value={familysize}
                onChange={(e) => setfamilysize(e.target.value)}
                className="select"
                required
              >
                <option value="">Select a family size room </option>
                <option value={0}>0</option>
                {
                  Array.from(
                    { length: totalfamilyroom },
                    (_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    )
                  )}
              </select>
            </div>

      

            <div className="app__newsletter-heading">
              <h1 className="headtext__cormorant">Enter your Information </h1>
            </div>

            <div className="app__newsletter-input flex__center">
              <button type="button" className="custom__button">
                Adult 
              </button>
              <input
                className="input"
                type="number"
                placeholder="Enter adult no "
                onChange={(e) => setadult(e.target.value)}
                value={adult}

                required
              />
            </div>
            <div className="app__newsletter-input flex__center">
              <button type="button" className="custom__button">
                children 
              </button>
              <input
                className="input"
                type="number"
                placeholder="Enter children no "
                onChange={(e) => setchildren(e.target.value)}
                value={children}

                required
              />
            </div>
 
            <div className="app__newsletter-input flex__center">
              <button type="button" className="custom__button">
                Enter Name
              </button>
              <input
                className="input"
                type="text"
                placeholder="Enter your Name"
                onChange={(e) => setname(e.target.value)}
                value={name}

                required
              />
            </div>

            <div className="app__newsletter-input flex__center">
              <button type="button" className="custom__button">
                Enter Phone Number
              </button>
              <input
                className="input"
                type="number"
                placeholder="Enter your Phone number"
                onChange={(e) => setphone(e.target.value)}
                value={phone}
                required
              />
            </div>
            <div className="app__newsletter-input flex__center">
              <button type="button" className="custom__button">
                Enter Email
              </button>
              <input
                className="input"
                type="Email"
                placeholder="Enter your email"
                onChange={(e) => setemail(e.target.value)}
                value={email}
                required
              />
            </div>

            <div className="app__newsletter-input flex__center">
              <button type="submit" className="custom__button submitbtn">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}; 

export default BookRoom;