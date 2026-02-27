import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="mt-5">
      <div className="flex flex-col space-y-2 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">About Us</h1>
        <p className="text-muted-foreground">Learn more about our mission and vision</p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We are dedicated to providing high-quality education accessible to everyone, everywhere. 
              Our platform empowers learners to achieve their goals through innovative and engaging content.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To become the leading learning management system that transforms education through 
              technology, making learning more effective, engaging, and accessible for all.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Why Choose Us</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Expert-designed courses across multiple disciplines</li>
              <li>Interactive and engaging learning experience</li>
              <li>Flexible learning at your own pace</li>
              <li>Supportive community of learners and educators</li>
              <li>Affordable pricing with quality content</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
