import { Container } from "./mainLandingPage";
export function Page2() {
    return (
        <Container id={2}>
            <div className="flex flex-col items-center justify-center h-[1000px] w-screen bg-green-100 p-10 ">
                <h1 className="text-4xl font-bold">Page 2</h1>
                <p className="mt-4 text-lg">This is the second page content.</p>
            </div>
        </Container>
    );
}