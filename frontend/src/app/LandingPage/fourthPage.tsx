import { Container } from "./mainLandingPage";


export function Page4() {
    return (
        <Container id={4}>
            <div className="flex flex-col items-center justify-center h-screen w-screen bg-red-100 p-10">
                <h1 className="text-4xl font-bold">Page 4</h1>
                <p className="mt-4 text-lg">This is the fourth page content.</p>
            </div>
        </Container>
    );
}