import React, { useEffect, useState } from 'react'
import styles from './style.module.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';

const Dashboard = () => {
    const [page, setpage] = useState(true)
    const [cartItems, setCartItems] = useState(JSON.parse(sessionStorage.getItem('data') || "[]") ?? []);
    const [flashVisible, setFlashVisible] = useState(false);
    const [inventory, setInventory] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const data = [
      { img: 'festive', text: "Festive Looks Rust Red Ribbed Velvet Long Sleeve Bodysuit", price: "$38", decrease: "", quantity: 1, id: "festive" },
      { img: 'chevron', text: "Chevron Flap Crossbody Bag", price: "$5.77", decrease: 'seven', quantity: 1, id: "chevron" },
      { img: 'manila', text: "Manilla Tan Multi Plaid Oversized Fringe Scarf", price: "$29", decrease: 'three', quantity: 1, id: "manila" },
      { img: 'diamante', text: "Diamante Puff Sleeve Dress - Black", price: "$45.99", decrease: "", quantity: 1, id: "diamante" },
      { img: 'banette', text: "Banneth Open Front Formal Dress in Black", price: "$69", decrease: 'nine', quantity: 1, id: "banette" },
    ];
  
    // Function to add an item to the cart
    const addToCart = (num: any) => {
      const session = JSON.parse(sessionStorage.getItem('data') || "[]") ?? [];
      const edit = session.filter((res: any) => res.id !== data[num].id);
      const addition = session.filter((res: any) => res.id === data[num].id).map((res: any) => {
        if (res.quantity) {
          return { ...res, quantity: res.quantity + 1 };
        }
      });
      const condition = addition.length !== 0 ? addition : [data[num]];
      const array = [...edit, ...condition];
      
      sessionStorage.setItem('data', JSON.stringify(array));
      setCartItems(array); // Update cartItems state
      setFlashVisible(true); // Show flash effect
  
      setTimeout(() => {
        setFlashVisible(false); // Hide flash after 3 seconds
      }, 3000);
  
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  
    // Hover effect for the purchase items
    const hoverEffect = (id: string) => {
      const data = document.getElementById(id); // Example hover style
      if(data){
        data.style.backgroundColor = "#f0f0f0"
      }
    };
  
    const removeHoverEffect = (id: string) => {
      const data = document.getElementById(id); // Revert hover effect
      if(data){
        data.style.backgroundColor = ""
      }
    };

    
    // Function to calculate the total price of items
    const calculateTotalPrice = (items: any) => {
        const total = items.reduce((sum: any, item: any) => sum + parseFloat(item.price.replace('$', '')), 0);
        const total2 = items.reduce((sum: any, item: any) => sum + parseFloat(item.price.replace('$', '')), 0);
        setTotalPrice(total);
    };
    
    // Function to delete an item from inventory
    const deleteItem = (index: any) => {
        const updatedInventory = inventory.filter((_, i) => i !== index);
        setInventory(updatedInventory);
        sessionStorage.setItem('data', JSON.stringify(updatedInventory));
        calculateTotalPrice(updatedInventory);
    };

    const imagePaths: any = {
        festive: require('../assets/img/bought/Festive.svg').default,
        chevron: require('../assets/img/bought/Chevron.svg').default,
        manila: require('../assets/img/bought/Manila.svg').default,
        diamante: require('../assets/img/bought/Diamante.svg').default,
        banette: require('../assets/img/bought/Bannete.svg').default,
        seven: require('../assets/img/bought/seven.svg').default,
        three: require('../assets/img/bought/three.svg').default,
        nine: require('../assets/img/bought/nine.svg').default
    };


    useEffect(() => {
        setCartItems(JSON.parse(sessionStorage.getItem('data') || "[]") ?? []);
    }, []);

    useEffect(() => {
        const savedData = JSON.parse(sessionStorage.getItem('data') || "[]") ?? [];
        setInventory(savedData);
        calculateTotalPrice(savedData);
    }, []);


  return (
    <>
    <div >
        { page ?
        <>
        <section className={styles.header}>
            <div className={`${styles.top} d-flex`}> {/* flex*/}
                <div className={styles.left_header}>
                    <span><strong>WOMEN</strong></span>
                    <span>PLUS</span>
                    <span>MEN</span>
                    <span>ACCESORIES</span>
                </div>
                <div className={styles.logo}>
                    <img src={require('../assets/img/Logo.svg').default} alt="Logo" />
                </div>
                <div className={styles.right_header}>
                    <div className="img-fluid ">
                        <img src={require('../assets/img/bx_bx-user.svg').default} alt="bx_bx-user" />
                    </div>
                    <div className={styles.purchase} id="bag"> 
                        <div className="img-fluid">
                            <img src={require('../assets/img/bx_bx-shopping-bag.svg').default} alt="bag" />
                        </div> 
                        <div className={styles.listed} style={{display: flashVisible ? 'block' : ""}} id="listed">
                            <div className={styles.list}  id="list">
                                {cartItems.map((item: any) => (
                                    <div className={styles.cards} id={item.id} key={item.id}
                                        onMouseOver={() => hoverEffect(item.id)}
                                        onMouseOut={() => removeHoverEffect(item.id)}>
                                        <img src={imagePaths[item.img]} alt={item.text} />
                                        <div className={styles.details}>
                                        <p className={styles.desc}>{item.text}</p>
                                        <p>{item.quantity}</p>
                                        <div className={styles.pricetag}>
                                            <p className={styles.price}>{item.price}</p>
                                            {item.decrease && <img className={styles.decrease} src={imagePaths[item.decrease]} alt="Decrease" />}
                                        </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="d-flex justify-content-center mb-5">
                                <button type="button" id="btn" className={`${styles.btn_dark} btn`} onClick={()=> setpage(false)}>BEGIN CHECKOUT</button>{/*btn*/}
                            </div>
                        </div> 
                    </div>
                    <div className="img-fluid "><img src={require('../assets/img/bx_bx-heart.svg').default} alt="bx_bx-heart" /></div>
                    <div className="img-fluid "><img src={require('../assets/img/bx_bx-support.svg').default} alt="bx_bx-support" /></div>
                    <div className="img-fluid "><img src={require('../assets/img/bx_bx-search.svg').default} alt="bx_bx-search" /></div>
                    <div className={styles.dropdown}>
                        <a className={`btn btn-secondary ${styles.dropdown_toggle} d-flex`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <div className="img-fluid">
                                <img src={require('../assets/img/US Flag.svg').default} style={{marginRight: "0"}} alt="USFlag" />
                            </div>
                          <span>USD $</span>
                        </a>
                        <ul className="dropdown-menu">
                          <li><a className="dropdown-item" href="#">Action</a></li>
                          <li><a className="dropdown-item" href="#">Another action</a></li>
                          <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={`${styles.bottom} d-flex`}>{/*flex*/}
                <div className={styles.wd_20}><img src={require('../assets/img/crown.svg').default} alt="crown" /> <span>Exclusive Deals for VIP 2 and up!</span></div>
                <div className={styles.wd_20}><img src={require('../assets/img/star.svg').default} alt="star" /> <span>Weekly New Arrivals</span></div>
                <div className={styles.wd_20}><img src={require('../assets/img/van.svg').default} alt="van" /> <span>Free Shipping On Orders Over $100</span></div>
                <div className={styles.wd_20}><img src={require('../assets/img/pin.svg').default} alt="pin" /> <span>Track Your Order</span></div>
                <div className={styles.wd_20}><img src={require('../assets/img/purchase.svg').default} alt="purchase" /> <span>10% Off On Your First Order!</span></div>
            </div>
        </section>
        <section className={styles.image}>
        <Swiper pagination={true} modules={[Pagination]} className={`mySwiper ${styles.swiper}`}>
          <SwiperSlide><img src={require('../assets/img/Hero.svg').default} alt="Hero" /></SwiperSlide>
          <SwiperSlide><img src={require('../assets/img/Hero.svg').default} alt="Hero" /></SwiperSlide>
        </Swiper>
        </section>
        <section className={styles.sites_deals}>
            <div className={styles.five}>
                <div className={styles.pricetag}>
                    <span>$5</span>
                    <span>OFF</span>
                </div>
                <p>ON ORDERS ABOVE $50</p>
            </div>
            <div className={styles.fifteen}>
                <div className={styles.pricetag}>
                    <span>$15</span>
                    <span>OFF</span>
                </div>
                <p>ON ORDERS ABOVE $75</p>
            </div>
            <div className={styles.twenty}>
                <div className={styles.pricetag}>
                    <span>$20</span>
                    <span>OFF</span>
                </div>
                <p>ON ORDERS ABOVE $150</p>
            </div>
            <div className={styles.thirty}>
                <div className={styles.pricetag}>
                    <span>$30</span>
                    <span>OFF</span>
                </div>
                <p>ON ORDERS ABOVE $200</p>
            </div>
            <div className={styles.checkout}> <button type="button" className="btn btn-dark">CHECK OUT ALL SITE-WIDE DEALS</button></div>
        </section>
        <section className={styles.vip_exclusive}>
            <h3>BLACK FRIDAY EXCLUSIVE</h3>
            <span>FREE SHIPPING ON ALL ORDERS FOR VIP 2 AND UP!</span>
            <div className={styles.btn_part}>
                <button type="button" className="btn btn-light">SHOP NOW</button>
            </div>
        </section>
        <section className={styles.trending}>
            <h1>Now Trending</h1>
            <p>See what everyone’s wearing right now</p>
            <div className={styles.genre}>
                <div className={styles.card}><img src={require('../assets/img/trending/winter.svg').default} alt="winter" /><span>WINTER FASHION</span></div>
                <div className={styles.card}><img src={require('../assets/img/trending/boots.svg').default} alt="boots" /><span>BOOTS</span></div>
                <div className={styles.card}><img src={require('../assets/img/trending/nightOut.svg').default} alt="nightOut" /><span>NIGHT OUT</span></div>
                <div className={styles.card}><img src={require('../assets/img/trending/holiday.svg').default} alt="holiday" /><span>HOLIDAYS</span></div>
                <div className={styles.card}><img src={require('../assets/img/trending/outwear.svg').default} alt="outwear" /><span>OUTWEAT</span></div>
                <div className={styles.card}><img src={require('../assets/img/trending/whiteDress.svg').default} alt="whiteDress" /><span>WHITE DRESS</span></div>
                <div className={styles.card}><img src={require('../assets/img/trending/sweater.svg').default} alt="sweater" /><span>SWEATER</span></div>
                <div className={styles.card}><img src={require('../assets/img/trending/party.svg').default} alt="party" /><span>PARTY</span></div>
            </div>
            <div className={styles.buttons}>
                <button type="button" className="btn btn-light">#Thanksgiving</button>
                <button type="button" className="btn btn-light">#NewYears</button>
                <button type="button" className="btn btn-light">#Knitted</button>
                <button type="button" className="btn btn-light">#Pajamas</button>
                <button type="button" className="btn btn-light">#WFH</button>
                <button type="button" className="btn btn-light">#FallFashion</button>
            </div>
        </section>
        <section className={styles.arrivals}>
            <div className={styles.left_arrival} >
                <h1>NEW <br/> ARRIVALS</h1>
                <p>
                    Get ready for the holidays with us!
                </p>
                <button type="button" className="btn btn-light">SHOP NOW</button>
            </div>
        </section>
        <section className={styles.bought}>
            <h1>
                Recently Bought
            </h1>
            <div className={styles.items} id="items">
                {data.map((item, index) => (
                <div className={styles.cards} key={item.id}>
                    <img src={imagePaths[item.img]} alt={item.text} />
                    <p className={styles.desc}>{item.text}</p>
                    <div className={styles.pricetag}>
                        <p className={styles.price} style={{ color: !item.decrease ? 'black' : 'red' }}>{item.price}</p>
                        {item.decrease && <img className={styles.decrease} src={imagePaths[item.decrease]} alt="Price decrease" />}
                        <button type="button" className="btn btn-dark" onClick={() => addToCart(index)}>Buy</button>
                    </div>
                </div>
                ))}
            </div>
        </section>
        <section className={styles.inspo}>
            <h1>Your Next Inspo</h1>
            <span>
                Checkout who’s wearing what by using #THREADEDInspo on Instagram
            </span>
            <div className={styles.post_image}>
                <div className={styles.card}><img src={require('../assets/img/inspo/first.svg').default} alt="first" /></div>
                <div className={styles.card}><img src={require('../assets/img/inspo/second.svg').default} alt="second" /></div>
                <div className={styles.card}><img src={require('../assets/img/inspo/third.svg').default} alt="third" /></div>
                <div className={styles.card}><img src={require('../assets/img/inspo/fourth.svg').default} alt="fourth" /></div>
                <div className={styles.card}><img src={require('../assets/img/inspo/fifth.svg').default} alt="fifth" /></div>
            </div>
            <button type="button" className="btn btn-dark">VIEW ALL POSTS</button>
            <div className={styles.fillup}>
                <h1 className={styles.sign}>SIGN UP FOR EXCLUSIVE DEALS AND UPDATES</h1>
                <div className={styles.input_group}>
                    <input type="text" className={styles.form_control} placeholder="Your Email Address" aria-label="Username" aria-describedby="basic-addon1"/>
                    <span className={styles.input_group_text} id="basic-addon1"><img src={require('../assets/img/inspo/arrRigth.svg').default} alt="arrow" /></span>
                  </div>
            </div>
        </section>
        <section className={styles.footer }>
            <div className={styles.footer_top}>
                <div className={styles.info}>
                    <p className="mb-2"> <strong> COMPANY INFO</strong></p>
                    <ul>
                        <li className="mb-2">About THREADED</li>
                        <li className="mb-2">affiliate</li>
                        <li className="mb-2">Blog</li>
                        <li className="mb-2">Careers</li>
                    </ul>
                </div>
                <div className={styles.support}>
                    <p className="mb-2"><strong>HELP & SUPPORT</strong></p>
                    <ul>
                        <li className="mb-2">FAQ</li>
                        <li className="mb-2">Shipping</li>
                        <li className="mb-2">Returns</li>
                        <li className="mb-2">How to Order</li>
                        <li className="mb-2">How To Track</li>
                    </ul>
                </div>
                <div className={styles.care}>
                    <p className="mb-2"><strong>CUSTOMER CARE</strong></p>
                    <ul>
                        <li className="mb-2">Contact Us</li>
                        <li className="mb-2">Payment Methods</li>
                    </ul>
                </div>
                <div className={styles.socials}>
                    <div className={styles.follow}>
                        <p><strong>FOLLOW US</strong></p>
                        <div className={styles.icons}>
                            <img src={require('../assets/img/footer/fb.svg').default} alt="fb" />
                            <img src={require('../assets/img/footer/insta.svg').default} alt="insta" />
                            <img src={require('../assets/img/footer/twitter.svg').default} alt="twitter" />
                            <img src={require('../assets/img/footer/youtube.svg').default} alt="youtube" />
                            <img src={require('../assets/img/footer/pinterest.svg').default} alt="pinterest" />
                            <img src={require('../assets/img/footer/tiktok.svg').default} alt="tiktok" />
                        </div>
                    </div>
                    <br/>
                    <div className={styles.payment}>
                        <p><strong>WE ACCEPT</strong></p>
                        <div className={styles.icons}>
                            <img src={require('../assets/img/footer/visa.svg').default} alt="VISA" />
                            <img src={require('../assets/img/footer/mastercard.svg').default} alt="mastercard" />
                            <img src={require('../assets/img/footer/maestro.svg').default} alt="maestro" />
                            <img src={require('../assets/img/footer/americanExpress.svg').default} alt="americanExpress" />
                            <img src={require('../assets/img/footer/paypal.svg').default} alt="paypal"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.footer_bottom}>
                <span> ©2021 THREADED All Rights Reserved.</span>
                <img src="../assets/img/Logo.svg" alt="logo"/>
            </div>
        </section>
        </>
        :
        <>
            <section className={styles.title}>
                <div className={styles.left}>
                    <h1>SHOP BAG</h1>
                </div>
                </section>
                <section className={`${styles.purchased} d-flex justify-content-between`} >
                <div className={styles.item} id="inventory">
                {inventory.map((item: any, index: number) => (
                    <div className={styles.product} key={index}>
                        <div className={styles.content}>
                        <img src={imagePaths[item.img]} alt={item.text} />
                        <div className={styles.context}>
                            <p>Description: {item.text}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p onClick={() => deleteItem(index)} style={{ cursor: 'pointer', color: 'red' }}>Remove</p>
                        </div>
                        </div>
                        <div className={styles.price}>
                        <span>{item.price}</span>
                        </div>
                    </div>
                ))}
                    <div className={styles.header}>
                        <span>ITEM</span>
                        <span>PRICE</span>
                    </div>
                </div>
                <div className={styles.buy}>
                    <div className={styles.area_price}>
                        <div className={styles.total}>
                            <p>Subtotal</p>
                            <p>Delivery</p>
                        </div>
                        <div className={styles.total}>
                            <p id="money"> ${totalPrice.toFixed(2)}</p>
                            <p>0</p>
                        </div>
                    </div>
                    <div className={styles.btns}>
                        <button type="button" className="btn btn-dark">Buy Now</button>
                    </div>
                </div>
            </section>
        </>
        
    }
    </div>
    </>
    
  )
}

export default Dashboard
