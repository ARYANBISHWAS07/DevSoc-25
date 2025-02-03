import { Container } from "./mainLandingPage";


export function Page3() {
    return (
        <Container id={3}>
            <div className="flex flex-col items-center justify-center h-screen w-screen bg-yellow-100 p-10">
                <h1 className="text-4xl font-bold">Page 3</h1>
                <p className="mt-4 text-lg">This is the third page content.</p>
            </div>
        </Container>
    );
}