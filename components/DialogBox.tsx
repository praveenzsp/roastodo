import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";

function DialogBox() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary">Delete</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>A sweet message</DialogTitle>
                    <DialogDescription className="text-gray-300">
                        Since you&apos;re so busy all day, here&apos;s a small
                        message for you
                    </DialogDescription>
                </DialogHeader>
                <div>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur tempora nobis ducimus iusto aut in consectetur culpa nesciunt aperiam. Minima tempore, nesciunt veritatis esse eligendi itaque laboriosam quia aperiam eos.</p><br></br>
					<p className="text-gray-300 text-sm">So do you regret not completing it?</p>
				</div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="submit" variant="secondary">
                            Yes, I regret
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default DialogBox;
