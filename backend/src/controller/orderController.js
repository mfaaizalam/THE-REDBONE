import Order from '../model/Order.js';
import nodemailer from 'nodemailer';


 

export const placeOrder = async (req, res) => {
  try {
    const { items, city, area, customerName, phone, email, address, landmark } = req.body;

    const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const order = await Order.create({
      items,
      city,
      area,
      customerName,
      phone,
      email,
      address,
      landmark,
      totalPrice
    });

    // Send email to admin
    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "smartwrite1414@gmail.com",         
        pass: "lbrfwkgrgvfyafpt",                
    },
});

    const mailOptions = {
      from:"smartwrite1414@gmail.com" ,
     to: "smartwrite1414@gmail.com",   
      subject: `New Order from ${customerName}`,
      html: `
City: ${city}, Area: ${area}
Name: ${customerName}, Phone: ${phone}, Email: ${email}
Address: ${address}, Landmark: ${landmark}
Total: ${totalPrice}$
Items: ${items.map(i => `${i.name} x${i.quantity}`).join(', ')}
      `
    };

    const info = await transporter.sendMail(mailOptions);
        console.log("Order is  placed Successfully:", info.response);
    
        res.status(200).json({ message: "Order is  placed Successfully!" });
      } catch (err) {
        console.error("Error in Ordering Food:", err);
        res.status(500).json({ message: "Server Error" });
      }
};