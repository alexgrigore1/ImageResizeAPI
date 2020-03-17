/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function (buffer: Buffer): object {
    return {
        resize: (width: number, height: number) => {
            return {
                toBuffer: () => "resized image"
            };
        }
    };
};