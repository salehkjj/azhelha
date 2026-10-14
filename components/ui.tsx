'use client';
import * as Dialog from '@radix-ui/react-dialog';
import {X,ArrowLeft} from 'lucide-react';
export function Button({children,variant='primary',...props}:React.ButtonHTMLAttributes<HTMLButtonElement>&{variant?:'primary'|'secondary'|'ghost'}){return <button className={`button ${variant}`} {...props}>{children}</button>}
export function Modal({title,children,onClose}:{title:string;children:React.ReactNode;onClose:()=>void}){return <Dialog.Root open onOpenChange={v=>!v&&onClose()}><Dialog.Portal><Dialog.Overlay className="overlay"/><Dialog.Content className="modal" aria-describedby={undefined}><div className="modal-head"><Dialog.Title>{title}</Dialog.Title><Dialog.Close className="icon-button" aria-label="إغلاق"><X size={20}/></Dialog.Close></div>{children}</Dialog.Content></Dialog.Portal></Dialog.Root>}
export function SectionTitle({eyebrow,title,description,action}:{eyebrow?:string;title:string;description?:string;action?:React.ReactNode}){return <div className="section-heading"><div>{eyebrow&&<div className="eyebrow">{eyebrow}</div>}<h2>{title}</h2>{description&&<p className="muted">{description}</p>}</div>{action}</div>}
export function Empty({text,action}:{text:string;action?:React.ReactNode}){return <div className="empty"><ArrowLeft size={28}/><p>{text}</p>{action}</div>}
