'use client';
import React , {useState} from 'react';
import { loadStripe } from "@stripe/stripe-js"; 
import Image from 'next/image';

// module imports
import { secondaryHeading } from '@/globals/tailwindvariables';
import { useRouter } from 'next/navigation';
import Progessbar from '@/app/component/progressBar';
import NavBar from '@/app/(pages)/(auth)/authNavbar';

const Payment = () => {
  const router = useRouter();


  const [product, setProduct] = useState({ 
    name: "Go FullStack with KnowledgeHut", 
    price: 1000, 
    productOwner: "KnowledgeHut", 
    description: 
      "This beginner-friendly Full-Stack Web Development Course is offered online in blended learning mode, and also in an on-demand self-paced format.", 
    quantity: 1, 
  }); 



  const makePayment = async () => { 
    const stripe : any = await loadStripe("pk_test_51JMvNpAIsBBwEZbsJuMCirc88j6z96mKj9ycl497ozu9ljMEIHFWBc7cIVVqKHdY34B8q3u4mn0jeXqM1rvP3szs00PzPtx0ZX"); 
    const body = { product }; 
    const headers = { 
      "Content-Type": "application/json", 
    }; 
 
    const response = await fetch( 
      "http://localhost:4000/api/auth/create-checkout-session", 
      { 
        method: "POST", 
        headers: headers, 
        body: JSON.stringify(body), 
      } 
    ); 

 
    const session = await response.json(); 
    
 
    const result = stripe.redirectToCheckout({ 
      sessionId: session.data.id, 
    });
    
 
    if (result.error) { 
      console.log(result.error); 
    } 
  }; 

  
  return (
    <>
      <NavBar />
      <section className="grid place-items-center mt-10">
        <div className="min-w-[750px]">
          <h2 className={secondaryHeading}>Payments Method</h2>
          <div className="w-full h-1 bg-mistyWhite my-2"></div>
          {/* methods */}
          <div className="flex justify-between items-center">
            <div
              className="h-52 grid place-items-center w-80 border-2  my-6 gap-10 border-doveGray rounded-s cursor-pointer"
              onClick={makePayment}
            >
              <Image
                src={'/stripe.svg'}
                alt={'stripe icon'}
                width={190}
                height={80}
              />
            </div>
            <div
              className="h-52 grid place-items-center w-80 border-2  border-doveGray rounded-s"  onClick={() => router.push('/congratulation')}>
              <Image
                src={'/paypal.svg'}
                alt={'paypal icon'}
                width={190}
                height={80}
              />
            </div>
          </div>
          <Progessbar progress={'75%'} step={3} className="my-3" />
        </div>
      </section>
    </>
  );
};

export default Payment;
