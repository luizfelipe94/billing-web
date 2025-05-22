import { Button, Modal, Form } from "react-bootstrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPrice, Price } from "../../services/prices-service";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface NewPriceModalProps {
  show: boolean;
  handleClose: () => void;
}

const schema = z.object({
  product: z.string().min(1, "Produto é obrigatório"),
  measure: z.string().min(1, "Medida é obrigatória"),
  size: z.string().min(1, "Tamanho é obrigatório"),
  price: z.number().positive("Preço deve ser maior que zero"),
});

type FormData = z.infer<typeof schema>;

export default function NewPriceModal({ show, handleClose }: NewPriceModalProps) {

  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: async (newPrice: Partial<Price>) => {
      try {
        return await createPrice(newPrice);
      } catch (error) {
        alert("Error creating price");
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prices"] })
    },
  });

  const handleSave = handleSubmit((data) => {
    mutation.mutate(data);
    handleClose();
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formProduct">
            <Form.Label>Produto</Form.Label>
            <Form.Control
              type="text"
              placeholder="Informe o nome do produto"
              {...register("product")}
              isInvalid={!!errors.product}
            />
            <Form.Control.Feedback type="invalid">
              {errors.product?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formMeasure">
            <Form.Label>Medida</Form.Label>
            <Form.Control
              type="text"
              placeholder="Informe a medida"
              {...register("measure")}
              isInvalid={!!errors.measure}
            />
            <Form.Control.Feedback type="invalid">
              {errors.measure?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSize">
            <Form.Label>Tamanho</Form.Label>
            <Form.Control
              type="text"
              placeholder="Informe o tamanho"
              {...register("size")}
              isInvalid={!!errors.size}
            />
            <Form.Control.Feedback type="invalid">
              {errors.size?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPrice">
            <Form.Label>Preço</Form.Label>
            <Form.Control
              type="number"
              step="0.0001"
              placeholder="Informe o preço"
              {...register("price", { valueAsNumber: true })}
              isInvalid={!!errors.price}
            />
            <Form.Control.Feedback type="invalid">
              {errors.price?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}