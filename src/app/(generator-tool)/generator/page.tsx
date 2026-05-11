"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { defaultIntroMessage } from "@/lib/config";
import { useGuestListStore } from "@/store";
import { CopyCheck, CopyIcon, SendIcon, TrashIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import QRCode from "react-qr-code";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GeneratorPage() {
  const { guestList, setGuestList } = useGuestListStore();
  const [isCopying, setIsCopying] = useState(false);
  const [guestName, setGuestName] = useState("");

  const handleGenerateTable = () => {
    const guestListArray = guestList
      .split("\n")
      .filter((name) => name.trim() !== "");

    return guestListArray;
  };

  const handleSendInvitation = (name: string) => {
    const encodedName = encodeURIComponent(name);
    const link = window.location.origin;
    const invitationLink = `${link}/?to=${encodedName}`;
    const message = encodeURIComponent(
      defaultIntroMessage
        .replace("[namatamu]", name)
        .replace("[link-undangan]", invitationLink)
    );

    window.open(`https://wa.me/?text=${message}`);
  };

  const handleDeleteGuest = (name: string) => {
    const updatedGuestList = guestList.replace(name, "");
    setGuestList(updatedGuestList);
  };

  const handleChangeGuestList = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setGuestList(e.target.value);
  };

  const handleCopyToClipboard = (name: string) => {
    const encodedName = encodeURIComponent(name);
    const link = window.location.origin;
    const invitationLink = `${link}/?to=${encodedName}`;
    const message = defaultIntroMessage
      .replace("[namatamu]", name)
      .replace("[link-undangan]", invitationLink);
    navigator.clipboard.writeText(message);
    setIsCopying(true);
    toast.success("Teks berhasil disalin ke clipboard", {
      duration: 2000,
      onDismiss: () => setIsCopying(false),
    });
  };

  const handleQRCodeGenerate = () => {
    const encodedName = encodeURIComponent(guestName);
    const link = window.location.origin;
    const invitationLink = `${link}/?to=${encodedName}`;
    return invitationLink;
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-center h-full py-10 px-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-center">
          Kirim undangan pernikahan dengan nama tamu
        </h1>
        <Textarea
          placeholder="Masukkan nama tamu undangan, pisahkan dengan enter"
          className="w-full"
          rows={10}
          cols={30}
          value={guestList}
          onChange={handleChangeGuestList}
        />
        <div className="flex flex-col gap-2 w-full">
          <h2>Daftar Nama Tamu</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead className="w-1/4">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {guestList.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={2}
                    className="text-center"
                  >
                    Tidak ada data tamu
                  </TableCell>
                </TableRow>
              )}
              {guestList.length > 0 && (
                <>
                  {handleGenerateTable().map((guest, index) => (
                    <TableRow key={index}>
                      <TableCell>{guest}</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Button
                          variant={"neutral"}
                          size={"sm"}
                          className="flex items-center gap-2"
                          onClick={() => handleSendInvitation(guest)}
                        >
                          <SendIcon className="size-4" />
                          <span>Kirim Undangan</span>
                        </Button>
                        <Button
                          variant={"neutral"}
                          size={"icon"}
                          className="flex items-center gap-2"
                          onClick={() => handleCopyToClipboard(guest)}
                        >
                          {isCopying ? (
                            <CopyCheck className="size-4 text-green-500" />
                          ) : (
                            <CopyIcon className="size-4" />
                          )}
                        </Button>
                        <Button
                          variant={"neutral"}
                          size={"sm"}
                          className="flex items-center gap-2"
                          onClick={() => handleDeleteGuest(guest)}
                        >
                          <TrashIcon className="size-4" />
                          <span>Hapus</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold text-center">
          Generate QR-CODE & Link
        </h1>
        <Input
          placeholder="Masukkan nama tamu"
          className="w-full"
          onChange={(e) => {
            setTimeout(() => setGuestName(e.target.value), 500);
          }}
        />
        {guestName.length > 0 && (
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Scan Here</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 items-center justify-center">
              <QRCode
                value={handleQRCodeGenerate()}
                className="w-40 h-40"
              />
              <Button
                onClick={() =>
                  navigator.clipboard.writeText(handleQRCodeGenerate())
                }
              >
                <CopyIcon className="size-4" />
                <span>Copy Link</span>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
