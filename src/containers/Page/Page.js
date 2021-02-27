import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import "./Page.css";

const Page = () => {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>TV Shows</BreadcrumbItem>
      </Breadcrumb>
      <Form>
        <div className='page_form'>
          <Label for='tv_show'>Search for TV Show: </Label>
          <FormGroup className='page_form_input'>
            <Input type='text' name='tv_show' id='tv_show' />
            <Button>Search</Button>
          </FormGroup>
        </div>
      </Form>
    </div>
  );
};
export default Page;
