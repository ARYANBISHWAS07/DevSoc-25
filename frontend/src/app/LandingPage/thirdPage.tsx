import { Container } from "./mainLandingPage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Page3() {
  return (
    <Container id={3}>
      <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400 p-6">
        
        <Card className="w-full max-w-md shadow-2xl border border-yellow-400 rounded-xl bg-white">
          <CardHeader className="text-center">
            <CardTitle className="text-gray-800 text-2xl font-semibold">
              Welcome to Page 3
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-gray-700">
            <p>
              This is a beautifully styled section using <strong>shadcn/ui</strong>.  
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Enjoy a clean and modern UI design.
            </p>
          </CardContent>
        </Card>

      </div>
    </Container>
  );
}
