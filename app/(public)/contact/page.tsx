import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="mt-5">
      <div className="flex flex-col space-y-2 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">Contact Us</h1>
        <p className="text-muted-foreground">Get in touch with us for any inquiries</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <Mail className="h-8 w-8 mb-2" />
            <CardTitle>Email</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">info@mylms.com</p>
            <p className="text-muted-foreground">support@mylms.com</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Phone className="h-8 w-8 mb-2" />
            <CardTitle>Phone</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">+1 234 567 890</p>
            <p className="text-muted-foreground">Mon-Fri: 9AM - 5PM</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <MapPin className="h-8 w-8 mb-2" />
            <CardTitle>Address</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">123 Learning Street</p>
            <p className="text-muted-foreground">Education City, EC 12345</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
