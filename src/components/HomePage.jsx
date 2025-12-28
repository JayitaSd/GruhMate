// // import { useRef } from 'react';
// // import { Link } from 'react-router-dom';
// // import { hero, priceTrack, inventory, chef } from '../assets/images';
// // import Footer from './Footer';
// // import Teams from './Teams';
// // //bht changes karni hain in frontend(by anshu)
// // //navbar banana baaki hai
// // //flow sabka sahi karna baaki hai abhi tak
// // const HomePage = () => {
  
// //   const aboutSectionRef = useRef(null);
// //   const featuresSectionRef = useRef(null);

// //   // Function to scroll to section
// //   const scrollToSection = (ref) => {
// //     if (ref.current) {
// //       ref.current.scrollIntoView({ 
// //         behavior: 'smooth',
// //         block: 'start'
// //       });
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-white">
// //       {/* Header */}
// //       <header className="sticky top-0 z-50 bg-white shadow-sm">
// //         <div className="container mx-auto px-6">
// //           <div className="flex items-center justify-between h-16">
// //             {/* Logo */}
// //             <div className="flex items-center space-x-2">
// //               <img 
// //                 src={chef} 
// //                 alt="GruhMate Logo" 
// //                 className="w-8 h-8"
// //               />
// //               <span className="text-xl font-bold text-gray-900">GruhMate</span>
// //             </div>

// //             {/* Navigation */}
// //             <nav className="hidden md:flex items-center space-x-8">
// //               <a 
// //                 href="#"
// //                 onClick={(e) => {
// //                   e.preventDefault();
// //                   window.scrollTo({ top: 0, behavior: 'smooth' });
// //                 }}
// //                 className="text-gray-700 hover:text-blue-600 font-medium"
// //               >
// //                 Home
// //               </a>
// //               <a 
// //                 href="#about"
// //                 onClick={(e) => {
// //                   e.preventDefault();
// //                   scrollToSection(aboutSectionRef);
// //                 }}
// //                 className="text-gray-700 hover:text-blue-600 font-medium"
// //               >
// //                 About Us
// //               </a>
// //               <a 
// //                 href="#features"
// //                 onClick={(e) => {
// //                   e.preventDefault();
// //                   scrollToSection(featuresSectionRef);
// //                 }}
// //                 className="text-gray-700 hover:text-blue-600 font-medium"
// //               >
// //                 Features
// //               </a>
// //             </nav>

// //             {/* Get Started & Login */}
// //             <div className="flex items-center space-x-4">
// //               <Link 
// //                 to="/login" 
// //                 className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium"
// //               >
// //                 Login
// //               </Link>
// //               <Link 
// //                 to="/signup" 
// //                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
// //               >
// //                 Get Started
// //               </Link>
// //               {/* <Link 
// //                 to="/teams"
// //                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
// //               >
// //              TeamPage
// //               </Link> */}
// //               {/* <a href="/teams" className="px-3 py-2">Teams</a> */}
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       {/* Main Content */}
// //       <main className="container mx-auto px-6">
// //         {/* Hero Section */}
// //         <section className="py-12 md:py-20">
// //           <div className="flex flex-col md:flex-row items-center">
// //             {/* Left Content */}
// //             <div className="md:w-1/2 mb-12 md:mb-0">
// //               <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
// //                 Smart Kitchen Management
// //               </h1>
// //               <p className="text-lg text-gray-600 mb-8 leading-relaxed">
// //                 Track your kitchen inventory, compare prices across platforms, and never run out of essentials. 
// //                 GruhMate makes grocery management effortless for modern families.
// //               </p>
// //               <button 
// //                 className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
// //                 onClick={() => scrollToSection(featuresSectionRef)}
// //               >
// //                 Explore Features
// //               </button>
// //             </div>

// //             {/* Right Image */}
// //             <div className="md:w-1/2 flex justify-center">
// //               <div className="w-full max-w-md">
// //                 <img 
// //                   src={hero} 
// //                   alt="Smart Kitchen Management" 
// //                   className="w-full h-auto rounded-2xl shadow-lg"
// //                 />
// //               </div>
// //             </div>
// //           </div>
// //         </section>

// //         {/* About Us Section */}
// //         <section 
// //           ref={aboutSectionRef}
// //           className="py-12 md:py-20 scroll-mt-20"
// //         >
// //           <div className="text-center mb-12">
// //             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Us</h2>
// //             <p className="text-lg text-gray-600 max-w-3xl mx-auto">
// //               GruhMate is your intelligent kitchen companion designed to simplify grocery shopping 
// //               and inventory tracking for modern families. We combine price comparison with smart 
// //               inventory management to help you save time and money.
// //             </p>
// //           </div>
          
// //           <div className="grid md:grid-cols-3 gap-8 mt-12">
// //             <div className="text-center p-6 bg-blue-50 rounded-2xl">
// //               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //                 <span className="text-2xl">🎯</span>
// //               </div>
// //               <h3 className="text-xl font-bold text-gray-900 mb-2">Our Mission</h3>
// //               <p className="text-gray-600">
// //                 Make kitchen management effortless and cost-effective for every household.
// //               </p>
// //             </div>
            
// //             <div className="text-center p-6 bg-green-50 rounded-2xl">
// //               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //                 <span className="text-2xl">💡</span>
// //               </div>
// //               <h3 className="text-xl font-bold text-gray-900 mb-2">Our Vision</h3>
// //               <p className="text-gray-600">
// //                 Transform how families manage their kitchens with smart technology.
// //               </p>
// //             </div>
            
// //             <div className="text-center p-6 bg-purple-50 rounded-2xl">
// //               <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //                 <span className="text-2xl">🤝</span>
// //               </div>
// //               <h3 className="text-xl font-bold text-gray-900 mb-2">Our Values</h3>
// //               <p className="text-gray-600">
// //                 Simplicity, efficiency, and savings for every family we serve.
// //               </p>
// //             </div>
// //           </div>
// //         </section>

// //         {/* Features Section */}
// //         <section 
// //           ref={featuresSectionRef}
// //           className="py-12 md:py-20 scroll-mt-20"
// //         >
// //           <div className="text-center mb-12">
// //             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Features</h2>
// //             <p className="text-lg text-gray-600 max-w-3xl mx-auto">
// //               Discover how GruhMate can transform your kitchen management experience
// //             </p>
// //           </div>

// //           {/* Price Tracking Section */}
// //           <div className="mb-20">
// //             <div className="flex flex-col md:flex-row items-center bg-gray-50 rounded-3xl px-6 md:px-12 py-12">
// //               {/* Left Image */}
// //               <div className="md:w-2/5 mb-12 md:mb-0">
// //                 <div className="w-full max-w-xs mx-auto">
// //                   <img 
// //                     src={priceTrack} 
// //                     alt="Price Tracking Dashboard" 
// //                     className="w-full h-auto rounded-2xl shadow-lg"
// //                   />
// //                 </div>
// //               </div>

// //               {/* Right Content */}
// //               <div className="md:w-1/2 md:pl-12">
// //                 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Price Tracking</h2>
// //                 <p className="text-lg text-gray-600 mb-8 leading-relaxed">
// //                   Compare food prices in real-time across all major platforms like BigBasket, 
// //                   Swiggy Instamart, Zepto, and more. Get alerts for price drops and save money 
// //                   on every grocery purchase.
// //                 </p>
// //                 <div className="space-y-4">
// //                   <div className="flex items-center">
// //                     <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
// //                       <span className="text-blue-600">✓</span>
// //                     </div>
// //                     <span>Real-time price comparison</span>
// //                   </div>
// //                   <div className="flex items-center">
// //                     <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
// //                       <span className="text-blue-600">✓</span>
// //                     </div>
// //                     <span>Price drop alerts</span>
// //                   </div>
// //                   <div className="flex items-center">
// //                     <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
// //                       <span className="text-blue-600">✓</span>
// //                     </div>
// //                     <span>Best deal recommendations</span>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Inventory Management Section */}
// //           <div>
// //             <div className="flex flex-col md:flex-row items-center">
// //               {/* Left Content */}
// //               <div className="md:w-1/2 mb-12 md:mb-0">
// //                 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Inventory Management</h2>
// //                 <p className="text-lg text-gray-600 mb-8 leading-relaxed">
// //                   Keep track of everything in your kitchen. Monitor expiry dates, track consumption 
// //                   patterns, and automatically generate shopping lists when items run low.
// //                 </p>
// //                 <div className="space-y-4">
// //                   <div className="flex items-center">
// //                     <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-4">
// //                       <span className="text-green-600">✓</span>
// //                     </div>
// //                     <span>Expiry date tracking</span>
// //                   </div>
// //                   <div className="flex items-center">
// //                     <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-4">
// //                       <span className="text-green-600">✓</span>
// //                     </div>
// //                     <span>Family sharing & sync</span>
// //                   </div>
// //                   <div className="flex items-center">
// //                     <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-4">
// //                       <span className="text-green-600">✓</span>
// //                     </div>
// //                     <span>Smart shopping lists</span>
// //                   </div>
// //                   <div className="flex items-center">
// //                     <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-4">
// //                       <span className="text-green-600">✓</span>
// //                     </div>
// //                     <span>Waste reduction tracking</span>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Right Image */}
// //               <div className="md:w-2/5 md:pl-12">
// //                 <div className="w-full max-w-xs mx-auto">
// //                   <img 
// //                     src={inventory} 
// //                     alt="Inventory Management Interface" 
// //                     className="w-full h-auto rounded-2xl shadow-lg"
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Additional Features Grid */}
// //           <div className="grid md:grid-cols-2 gap-8 mt-20">
// //             <div className="p-6 border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow">
// //               <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
// //                 <span className="text-2xl">👨‍👩‍👧‍👦</span>
// //               </div>
// //               <h3 className="text-xl font-bold text-gray-900 mb-2">Family Sync</h3>
// //               <p className="text-gray-600">
// //                 Multiple family members can update inventory in real-time. Perfect for busy households.
// //               </p>
// //             </div>
            
            
            
// //             <div className="p-6 border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow">
// //               <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
// //                 <span className="text-2xl">🔔</span>
// //               </div>
// //               <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Alerts</h3>
// //               <p className="text-gray-600">
// //                 Get notified about expiring items, low stock, and price drops on your favorites.
// //               </p>
// //             </div>
// //           </div>
// //         </section>

// //         {/* CTA Section */}
// //         <section className="py-12 md:py-20 bg-blue-600 rounded-3xl text-center">
// //           <div className="max-w-2xl mx-auto px-6">
// //             <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
// //               Ready to Simplify Your Kitchen Management?
// //             </h2>
// //             <p className="text-lg text-blue-100 mb-8">
// //               Join thousands of families saving time and money with GruhMate
// //             </p>
// //             <Link 
// //               to="/signup" 
// //               className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
// //             >
// //               Get Started Free
// //             </Link>
// //           </div>
// //         </section>
// //       </main>

// //       <Footer />
// //     </div>
// //   )
// // }

// // export default HomePage
// import { useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { hero, priceTrack, inventory, chef } from '../assets/images';
// import Footer from './Footer';

// const HomePage = () => {
//   const aboutSectionRef = useRef(null);
//   const featuresSectionRef = useRef(null);

//   const scrollToSection = (ref) => {
//     if (ref.current) {
//       ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white">

//       {/* HEADER (UNCHANGED) */}
//       <header className="sticky top-0 z-50 bg-white shadow-sm">
//         <div className="container mx-auto px-6">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center space-x-2">
//               <img src={chef} alt="GruhMate Logo" className="w-8 h-8" />
//               <span className="text-xl font-bold text-gray-900">GruhMate</span>
//             </div>

//             <nav className="hidden md:flex items-center space-x-8">
//               <a
//                 href="#"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   window.scrollTo({ top: 0, behavior: 'smooth' });
//                 }}
//                 className="text-gray-700 hover:text-blue-600 font-medium"
//               >
//                 Home
//               </a>
//               <a
//                 href="#about"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   scrollToSection(aboutSectionRef);
//                 }}
//                 className="text-gray-700 hover:text-blue-600 font-medium"
//               >
//                 About Us
//               </a>
//               <a
//                 href="#features"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   scrollToSection(featuresSectionRef);
//                 }}
//                 className="text-gray-700 hover:text-blue-600 font-medium"
//               >
//                 Features
//               </a>
//             </nav>

//             <div className="flex items-center space-x-4">
//               <Link to="/login" className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium">
//                 Login
//               </Link>
//               <Link to="/signup" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
//                 Get Started
//               </Link>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* MAIN */}
//       <main className="container mx-auto px-6">

//         {/* HERO */}
//         <section className="py-12 md:py-20">
//           <div className="flex flex-col md:flex-row items-center">
//             <div className="md:w-1/2 mb-12">
//               <h1 className="text-4xl md:text-5xl font-bold mb-6">
//                 Smart Home & Kitchen Management
//               </h1>
//               <p className="text-lg text-gray-600 mb-8">
//                 GruhMate helps families track groceries, manage inventory,
//                 compare prices, receive smart alerts, and collaborate efficiently
//                 to maintain a stress-free home.
//               </p>
             
//             </div>

//             <div className="md:w-1/2">
//               <img src={hero} alt="Smart Kitchen" className="rounded-2xl shadow-lg" />
//             </div>
//           </div>
//         </section>

//         {/* ABOUT US */}
//         <section ref={aboutSectionRef} className="py-20 scroll-mt-20">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-bold mb-4">About Us</h2>
//             <p className="text-lg text-gray-600 max-w-4xl mx-auto">
//               GruhMate is a smart home and kitchen management platform built to
//               solve one of today’s biggest household challenges — managing groceries,
//               expenses, and coordination efficiently in a busy lifestyle.
//               <br /><br />
//               Rising grocery prices, food wastage, forgotten stock, and lack of
//               coordination among family members are common problems. GruhMate
//               brings everything together in one place to help families save money,
//               reduce waste, and maintain a clean, organized home.
//             </p>
//           </div>

//           <div className="max-w-5xl mx-auto text-gray-700 space-y-6">
//             <p>
//               <strong>Dashboard:</strong> Acts as the control center where users can
//               monitor stock levels, view alerts, and track daily usage.
//             </p>
//             <p>
//               <strong>User Profile:</strong> Displays personal details and connected
//               family members while keeping sensitive information secure.
//             </p>
//             <p>
//               <strong>Stocks & Scan System:</strong> Users can add items manually or
//               scan groceries and bills for faster inventory updates.
//             </p>
//             <p>
//               <strong>Recipe Generator:</strong> Suggests recipes based on available
//               ingredients to reduce food waste.
//             </p>
//             <p>
//               <strong>Price Comparison:</strong> Helps users compare prices across
//               platforms to get the best deals.
//             </p>
//             <p>
//               <strong>Teams & Notifications:</strong> Family members stay synchronized
//               with real-time updates, expiry alerts, low-stock warnings, and price-drop
//               notifications.
//             </p>
//           </div>
//         </section>

//         {/* FEATURES */}
//         <section ref={featuresSectionRef} className="py-20 scroll-mt-20">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-bold mb-4">Our Features</h2>
//             <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//               Powerful features designed to simplify home management and improve daily life
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 gap-8">
//             <Feature title="Smart Notifications" desc="Expiry alerts, low stock warnings, and price drop notifications." />
//             <Feature title="Price Comparison" desc="Compare grocery prices across platforms and save money." />
//             <Feature title="Inventory Management" desc="Track stock, expiry dates, and consumption patterns." />
//             <Feature title="Recipe Generation" desc="Get cooking ideas based on available ingredients." />
//             <Feature title="Family Teams" desc="Collaborate with family members in real-time." />
//             <Feature title="Scan System" desc="Scan groceries or bills to auto-update inventory." />
//           </div>
//         </section>

//         {/* CTA */}
       
//       </main>

//       <Footer />
//     </div>
//   );
// };

// const Feature = ({ title, desc }) => (
//   <div className="p-6 border rounded-2xl hover:shadow-lg transition">
//     <h3 className="text-xl font-bold mb-2">{title}</h3>
//     <p className="text-gray-600">{desc}</p>
//   </div>
// );

// export default HomePage;
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { hero, chef } from '../assets/images';
import Footer from './Footer';

const HomePage = () => {
  const aboutSectionRef = useRef(null);
  const featuresSectionRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">

      {/* HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <img src={chef} alt="GruhMate Logo" className="w-8 h-8" />
              <span className="text-xl font-bold text-gray-900">GruhMate</span>
            </div>

            <nav className="hidden md:flex items-center space-x-10">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="nav-link"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection(aboutSectionRef)}
                className="nav-link"
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection(featuresSectionRef)}
                className="nav-link"
              >
                Features
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">
                Login
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-md"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* HOME */}
      <main className="container mx-auto px-6">
        <section className="py-28">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <h1 className="text-5xl font-extrabold leading-tight mb-6">
                Smart Home & <span className="text-blue-600">Kitchen</span> Management
              </h1>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                GruhMate helps families track groceries, manage inventory,
                compare prices, receive smart alerts, and collaborate efficiently
                to maintain a stress-free home.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-blue-100 rounded-3xl blur-2xl opacity-40"></div>
              <img
                src={hero}
                alt="Smart Kitchen"
                className="relative rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* ABOUT US */}
        <section
          ref={aboutSectionRef}
          className="py-28 bg-white rounded-[3rem] shadow-inner scroll-mt-24"
        >
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-4xl font-extrabold mb-6">About Us</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              GruhMate is a smart home and kitchen management platform built to
              solve one of today’s biggest household challenges — managing groceries,
              expenses, and coordination efficiently in a busy lifestyle.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <InfoCard title="Why GruhMate?">
              Rising grocery prices, food wastage, forgotten stock, and lack of
              coordination among family members are common problems. GruhMate
              brings everything together in one place to help families save money,
              reduce waste, and maintain a clean, organized home.
            </InfoCard>

            <InfoCard title="Core Capabilities">
              <ul className="space-y-3">
                <li><strong>Dashboard:</strong> Monitor stock, alerts, daily usage</li>
                <li><strong>User Profile:</strong> Secure personal & family data</li>
                <li><strong>Stocks & Scan:</strong> Manual & scan-based entry</li>
                <li><strong>Recipe Generator:</strong> Cook smarter, waste less</li>
                <li><strong>Price Comparison:</strong> Find the best deals</li>
                <li><strong>Teams & Alerts:</strong> Stay synced in real-time</li>
              </ul>
            </InfoCard>
          </div>
        </section>

        {/* FEATURES */}
        <section
          ref={featuresSectionRef}
          className="py-28 scroll-mt-24"
        >
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extrabold mb-4">Our Features</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to simplify home management and improve daily life
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <Feature icon="🔔" title="Smart Notifications" desc="Expiry alerts, low stock warnings, and price drop notifications." />
            <Feature icon="💰" title="Price Comparison" desc="Compare grocery prices across platforms and save money." />
            <Feature icon="📦" title="Inventory Management" desc="Track stock, expiry dates, and consumption patterns." />
            <Feature icon="🍳" title="Recipe Generation" desc="Get cooking ideas based on available ingredients." />
            <Feature icon="👨‍👩‍👧‍👦" title="Family Teams" desc="Collaborate with family members in real-time." />
            <Feature icon="📸" title="Scan System" desc="Scan groceries or bills to auto-update inventory." />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const Feature = ({ icon, title, desc }) => (
  <div className="group p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition">
      {title}
    </h3>
    <p className="text-gray-600 leading-relaxed">{desc}</p>
  </div>
);

const InfoCard = ({ title, children }) => (
  <div className="p-10 rounded-3xl bg-gradient-to-br from-blue-50 to-white shadow-lg">
    <h3 className="text-2xl font-bold mb-4 text-blue-600">{title}</h3>
    <div className="text-gray-700 leading-relaxed">{children}</div>
  </div>
);

export default HomePage;

